import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { IDocument } from "../models/document.model";

@Injectable({ 'providedIn': 'root' })
export class MediaService {
 private supabase: any;
 documents: BehaviorSubject<IDocument[]> = new BehaviorSubject<IDocument[]>([]);
 
 constructor() {
  this.supabase = null;
  this.fetchDocuments();
 }
 
 async fetchDocuments(): Promise<void> {
  try {
   const { data, error } = await this.supabase
   .from('media')
   .select('mediaData')
   .eq('mediaID', true)
   .single();
   
   if (error) throw error;
   
   this.documents.next(data.mediaData);
  } catch (error) {
   throw error;
  }
 }
 
 async updateDocuments(mediaData: IDocument[]): Promise<void> {
  try {
   const { data, error } = await this.supabase
   .from('media')
   .update({ mediaData })
   .eq('mediaID', true)
   .single();
   
   if (error) throw error;
   
   this.documents.next(mediaData);
  } catch (error) {
   throw error;
  }
 }
 
 async uploadFile(file: File): Promise<string | null> {
  try {
   const { data, error } = await this.supabase.storage.from('dynamic').upload(file.name, file);
   
   if (error) {
    if (error.message == 'The resource already exists') throw 'Datoteka s tim nazivom već postoji.';
    throw error.message;
   }
   
   return data?.path;
  } catch (error) {
   throw error;
  }
 }
 async deleteFile(filename: string) : Promise<void> {
  try {
   const { error } = await this.supabase.storage.from('dynamic').remove([ filename ]);
   
   if (error) throw error.message;
  } catch (error) {
   throw error;
  }
 }
 getByLink(url: string): IDocument | undefined {
  return this.documents.getValue().find(X => X.link == url);
 }
}