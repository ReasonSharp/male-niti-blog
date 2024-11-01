import { Component, OnDestroy, OnInit } from '@angular/core';
import { IDocument } from '../models/document.model';
import { MediaService } from '../services/media.service';
import { Subscription } from 'rxjs';
import { DisplayedComponentService } from '../services/displayed-component.service';

@Component({
 selector: 'app-media-admin',
 templateUrl: './media-admin.component.html',
 styleUrls: ['./media-admin.component.scss']
})
export class MediaAdminComponent implements OnInit, OnDestroy {
 success?: string;
 error?: string;
 saving: boolean = false;
 selectedFile?: string;
 editing: boolean = false;
 description: string = '';
 documents: IDocument[] = [];
 docSub?: Subscription;
 file!: File;
 selectedDocument?: IDocument;

 constructor(private displayedComponentService: DisplayedComponentService,
  private mediaService: MediaService) {}

 ngOnInit(): void {
  setTimeout(() => this.displayedComponentService.displayedComponent = 5, 0);
  this.docSub = this.mediaService.documents.subscribe(X => this.documents = X);
 }
 ngOnDestroy(): void {
  if (this.docSub) this.docSub.unsubscribe;
 }

 async onSubmit() : Promise<boolean> {
  this.saving = true;
  try {
   await this.mediaService.updateDocuments(this.documents);
   this.saving = false;
   this.success = 'Promjene su uspješno spremljene.';
   setTimeout(() => this.success = undefined, 10000);
   return true;
  } catch (error) {
   this.error = String(error);
   setTimeout(() => this.error = undefined, 10000);
   return false;
  } finally {
   this.saving = false;
  }
 }

 clearForm() {
  this.editing = false;
  this.description = '';
  this.selectedFile = undefined;
  this.selectedDocument = undefined;
 }

 async loadImage() {
  this.saving = true;
  if (this.editing && this.selectedDocument) {
   const idx = this.documents.findIndex(X => X.link == this.selectedDocument?.link);
   if (idx >= 0) this.documents[idx].description = this.description;
   this.onSubmit();
   this.clearForm();
   return;
  }
  if (this.selectedFile) {
   const type = this.getType(this.selectedFile);
   if (!type) {
    this.error = 'Neprepoznati tip datoteke. Dozvoljene su slike, video zapisi, zvučni zapisi i PDF dokumenti.';
    setTimeout(() => this.error = undefined, 10000);
    return;
   }
   try {
    const res = await this.mediaService.uploadFile(this.file);
    if (!res) {
     this.error = 'Greška prilikom učitavanja datoteke. Pokušajte ponovo.';
     setTimeout(() => this.error = undefined, 10000);
    }
    this.documents.push({ description: this.description, link: '/storage/v1/object/public/dynamic/' + res ?? '', type: type });
    this.clearForm();
    const subsuc = await this.onSubmit();
    if (!subsuc) {
     this.error = 'Datoteka je učitana, ali promjene nisu spremljene. Pritisnite gumb "Spremi promjene".';
     setTimeout(() => this.error = undefined, 10000);
    } else {
     this.success = 'Datoteka je uspješno učitana i promjene su spremljene';
     setTimeout(() => this.success = undefined, 10000);
    }
   } catch (error) {
    this.error = `Učitavanje datoteke nije uspjelo. ${String(error)}`;
    setTimeout(() => this.error = undefined, 10000);
   } finally {
    this.saving = false;
   }
  } else this.onSubmit();
 }

 getType(file: string) : string | undefined {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg'];
  const audioExtensions = ['mp3', 'wav', 'ogg', 'aac', 'flac'];
  const videoExtensions = ['mp4', 'avi', 'mov', 'wmv', 'flv', 'mkv'];

  const di = file.lastIndexOf('.');
  if (di < 0) return undefined;
  const ext = file.substring(di + 1)?.toLowerCase();

  if (imageExtensions.includes(ext.toLowerCase())) {
    return 'image';
  } else if (audioExtensions.includes(ext.toLowerCase())) {
    return 'audio';
  } else if (videoExtensions.includes(ext.toLowerCase())) {
    return 'video';
  } else if (ext.toLowerCase() === 'pdf') {
    return 'pdf';
  }
  return undefined;
 }

 onSelectFile(e: any) {
  if (e.target.files) this.file = e.target.files[0];
 }

 edit(doc: IDocument) {
  this.description = doc.description;
  this.selectedDocument = doc;
  this.editing = true;
 }

 async deleteDocument() {
  this.saving = true;
  const fn = this.selectedDocument?.link ? this.filename(this.selectedDocument?.link) : undefined;
  if (fn) {
   try {
    const res = await this.mediaService.deleteFile(fn);
    const idx = this.documents.findIndex(X => X.link == this.selectedDocument?.link);
    this.documents.splice(idx, 1);
    this.clearForm();
    const subsuc = await this.onSubmit();
    if (!subsuc) {
     this.error = 'Datoteka je obrisana, ali promjene nisu spremljene. Pritisnite gumb "Spremi promjene".';
     setTimeout(() => this.error = undefined, 10000);
    }
   } catch (error) {
    this.error = `Brisanje datoteke nije uspjelo. ${String(error)}`;
    setTimeout(() => this.error = undefined, 10000);
   } finally {
    this.saving = false;
   }
  }
 }
 filename(lnk: string) : string | undefined {
  const di = lnk.lastIndexOf('/');
  if (di < 0) return undefined;
  return lnk.substring(di + 1);
 }
 cancel() {
  this.editing = false;
  this.description = '';
  this.selectedFile = undefined;
 }
}