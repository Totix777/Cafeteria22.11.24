import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { Note, NoteImage } from '../types/haccp';

export const NotesManager: React.FC = () => {
  const [notes, setNotes] = useState<Note[]>([]);
  const { register, handleSubmit, reset } = useForm<Note>();
  const [images, setImages] = useState<NoteImage[]>([]);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    Array.from(files).forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newImage: NoteImage = {
          id: uuidv4(),
          dataUrl: reader.result as string,
          caption: file.name
        };
        setImages(prev => [...prev, newImage]);
      };
      reader.readAsDataURL(file);
    });
  };

  const onSubmit = (data: Note) => {
    const newNote: Note = {
      ...data,
      id: uuidv4(),
      images: images,
      createdAt: new Date(),
    };
    setNotes(prev => [...prev, newNote]);
    setImages([]);
    reset();
  };

  const categories = [
    'Allgemein',
    'Küche',
    'Lager',
    'Reinigung',
    'Wartung',
    'Personal'
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Notizen & Dokumentation</h2>
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Titel</label>
          <input
            {...register('title')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Titel der Notiz"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Kategorie</label>
          <select
            {...register('category')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            {categories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Priorität</label>
          <select
            {...register('priority')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="low">Niedrig</option>
            <option value="medium">Mittel</option>
            <option value="high">Hoch</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Inhalt</label>
          <textarea
            {...register('content')}
            rows={4}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            placeholder="Notizinhalt..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Bilder</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImageUpload}
            className="mt-1 block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
        </div>

        {images.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-4">
            {images.map((image) => (
              <div key={image.id} className="relative">
                <img
                  src={image.dataUrl}
                  alt={image.caption}
                  className="h-24 w-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setImages(prev => prev.filter(img => img.id !== image.id))}
                  className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}

        <div>
          <label className="block text-sm font-medium text-gray-700">Erstellt von</label>
          <input
            {...register('createdBy')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
        >
          Notiz Speichern
        </button>
      </form>

      {notes.length > 0 && (
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-4">Gespeicherte Notizen</h3>
          <div className="space-y-4">
            {notes.map((note) => (
              <div
                key={note.id}
                className={`p-4 rounded-lg border ${
                  note.priority === 'high'
                    ? 'border-red-200 bg-red-50'
                    : note.priority === 'medium'
                    ? 'border-yellow-200 bg-yellow-50'
                    : 'border-gray-200 bg-gray-50'
                }`}
              >
                <div className="flex justify-between items-start">
                  <h4 className="text-lg font-medium">{note.title}</h4>
                  <span className="text-sm text-gray-500">
                    {new Date(note.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-2">{note.content}</p>
                {note.images.length > 0 && (
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
                    {note.images.map((image) => (
                      <img
                        key={image.id}
                        src={image.dataUrl}
                        alt={image.caption}
                        className="h-20 w-full object-cover rounded"
                      />
                    ))}
                  </div>
                )}
                <div className="mt-2 flex justify-between items-center text-sm text-gray-500">
                  <span>{note.category}</span>
                  <span>{note.createdBy}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};