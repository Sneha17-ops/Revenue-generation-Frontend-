import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const INITIAL_PHOTOS = [
  {
    id: 'photo-1',
    url: '/assets/Mp1.jpeg',
    caption: 'Photo 1 • Small Caption Placeholder',
    isCover: true,
    enabled: true,
    order: 0,
  },
  {
    id: 'photo-2',
    url: '/assets/MP2.jpeg',
    caption: 'Photo 2 • Small Caption Placeholder',
    isCover: false,
    enabled: true,
    order: 1,
  },
  {
    id: 'photo-3',
    url: '/assets/MP3.jpeg',
    caption: 'Photo 3 • Small Caption Placeholder',
    isCover: false,
    enabled: true,
    order: 2,
  },
  {
    id: 'photo-4',
    url: '/assets/MP4.jpeg',
    caption: 'Photo 4 • Small Caption Placeholder',
    isCover: false,
    enabled: true,
    order: 3,
  },
  {
    id: 'photo-5',
    url: '/assets/MP5.jpeg',
    caption: 'Photo 5 • Small Caption Placeholder',
    isCover: false,
    enabled: true,
    order: 4,
  },
];

export const useJourneyGalleryStore = create(
  persist(
    (set, get) => ({
      photos: INITIAL_PHOTOS,

      // Add a new image
      addImage: (photoData) => {
        const current = get().photos;
        const newPhoto = {
          id: `photo-${Date.now()}`,
          url: photoData.url || '/assets/Mp1.jpeg',
          caption: photoData.caption || `Photo ${current.length + 1} • Small Caption Placeholder`,
          isCover: current.length === 0,
          enabled: true,
          order: current.length,
        };
        set({ photos: [...current, newPhoto] });
      },

      // Delete an image by ID
      deleteImage: (id) => {
        const current = get().photos.filter((p) => p.id !== id);
        // If deleted photo was cover, assign cover to first available
        let updated = current.map((item, idx) => ({ ...item, order: idx }));
        if (updated.length > 0 && !updated.some((p) => p.isCover)) {
          updated[0].isCover = true;
        }
        set({ photos: updated });
      },

      // Update caption
      updateCaption: (id, caption) => {
        set({
          photos: get().photos.map((p) => (p.id === id ? { ...p, caption } : p)),
        });
      },

      // Select cover image
      setCoverImage: (id) => {
        set({
          photos: get().photos.map((p) => ({
            ...p,
            isCover: p.id === id,
          })),
        });
      },

      // Toggle photo enable/disable state
      toggleEnabled: (id) => {
        set({
          photos: get().photos.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p)),
        });
      },

      // Move photo up in list
      moveUp: (index) => {
        if (index <= 0) return;
        const photos = [...get().photos];
        const temp = photos[index - 1];
        photos[index - 1] = photos[index];
        photos[index] = temp;
        // Re-index orders
        const reordered = photos.map((p, idx) => ({ ...p, order: idx }));
        set({ photos: reordered });
      },

      // Move photo down in list
      moveDown: (index) => {
        const photos = [...get().photos];
        if (index >= photos.length - 1) return;
        const temp = photos[index + 1];
        photos[index + 1] = photos[index];
        photos[index] = temp;
        // Re-index orders
        const reordered = photos.map((p, idx) => ({ ...p, order: idx }));
        set({ photos: reordered });
      },

      // Set entire reordered array
      reorderImages: (newPhotos) => {
        const reordered = newPhotos.map((p, idx) => ({ ...p, order: idx }));
        set({ photos: reordered });
      },

      // Reset store to defaults if needed
      resetToDefaults: () => set({ photos: INITIAL_PHOTOS }),
    }),
    {
      name: 'bindhyawasini_journey_photos_v1',
    }
  )
);
