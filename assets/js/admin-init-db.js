/**
 * Luna Whale Art Lab — Admin Database Initialization
 * This script provides a utility to inject initial mock data into Firestore.
 */

window.LunaAdmin = {
    async injectMockData() {
        console.log("🚀 Starting Mock Data Injection...");
        const db = window.LunaAuth.getDb();
        if (!db) {
            console.error("❌ Firestore not initialized. LunaAuth might not be ready.");
            return;
        }

        const batch = db.batch();

        // 1. Mock Classes (10 items)
        const mockClasses = [
            { id: "traditional-patterns", title: "Traditional Patterns", courseCode: "RM04", category: "culture", price: 45000, level: "Beginner", thumbnailUrl: "images/thumbnails/traditional-patterns.jpg", description: "Discover the beauty of traditional Korean patterns and their symbolic meanings.", requiredMaterials: ["Rice paper", "Traditional ink", "Brushes"] },
            { id: "seasonal-glasses", title: "Seasonal Color Theory", courseCode: "RM05", category: "color", price: 38000, level: "Intermediate", thumbnailUrl: "images/thumbnails/seasonal-glasses.jpg", description: "Master the art of seasonal color palettes through glass painting techniques.", requiredMaterials: ["Glass panes", "Glass markers", "Palette"] },
            { id: "wooden-pencil-case", title: "Wooden Craft Design", courseCode: "RM06", category: "project", price: 52000, level: "Beginner", thumbnailUrl: "images/thumbnails/wooden-pencil-case.jpg", description: "Build and decorate your own functional wooden pencil case using carving tools.", requiredMaterials: ["Wooden block", "Carving knife", "Sandpaper"] },
            { id: "space-scenery", title: "Space expressionism", courseCode: "RM07", category: "expression", price: 42000, level: "Advanced", thumbnailUrl: "images/thumbnails/space-scenery.jpg", description: "Use expressive brushwork to capture the vastness and mystery of outer space.", requiredMaterials: ["Acrylic paint", "Large canvas", "Sponge"] },
            { id: "miniature-studio", title: "Miniature Studio Design", courseCode: "RM08", category: "3d", price: 65000, level: "Intermediate", thumbnailUrl: "images/thumbnails/miniature-studio.jpg", description: "Create a 1:12 scale miniature of a professional art studio with working lights.", requiredMaterials: ["Balsa wood", "Mini LED kit", "Acrylic glue"] },
            { id: "light-box", title: "Light Box Scenery", courseCode: "RM09", category: "color", price: 35000, level: "Beginner", thumbnailUrl: "images/thumbnails/light-box.jpg", description: "Layer paper cutouts to create a stunning illuminated 3D landscape box.", requiredMaterials: ["Cardstock", "Shadow box", "Strip lights"] },
            { id: "machine-animals", title: "Bio-Mechanical Animals", courseCode: "RM10", category: "imagination", price: 48000, level: "Advanced", thumbnailUrl: "images/thumbnails/machine-animals.jpg", description: "Combine organic forms with mechanical elements to design futuristic creatures.", requiredMaterials: ["Metallic markers", "Tracing paper", "Graphite"] },
            { id: "fruit-patterns", title: "Organic Fruit Patterns", courseCode: "RM11", category: "nature", price: 30000, level: "Beginner", thumbnailUrl: "images/thumbnails/fruit-patterns.jpg", description: "Learn to simplify natural fruit forms into modern, vibrant repeatable patterns.", requiredMaterials: ["Watercolors", "Cold-press paper", "Masking fluid"] },
            { id: "fruit-anatomy", title: "Anatomy of Fruits", courseCode: "RM12", category: "observation", price: 32000, level: "Intermediate", thumbnailUrl: "images/thumbnails/fruit-anatomy.jpg", description: "Scientific illustration techniques applied to the internal structures of fruits.", requiredMaterials: ["Fine-tip pens", "Magnifying glass", "Sketchbook"] },
            { id: "forest-village", title: "Fantasy Forest Village", courseCode: "RM13", category: "3d", price: 58000, level: "Beginner", thumbnailUrl: "images/thumbnails/forest-village.jpg", description: "Construct a whimsical forest village using air-dry clay and natural found objects.", requiredMaterials: ["Air-dry clay", "Twigs/Moss", "Clay tools"] }
        ];

        mockClasses.forEach(item => {
            const ref = db.collection('classes').doc(item.id);
            batch.set(ref, {
                ...item,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        });

        // 2. Mock Encyclopedia (10 items, 2 per category)
        const mockEncy = [
            { id: "ency-01", tag: "Terms", category: "용어", title: "Chiaroscuro", shortDesc: "Contrast between light and dark.", fullDesc: "Chiaroscuro is an Italian term which translates as light-dark. It is a technique for modeling forms in painting by which the lighted parts seem to stand out from surrounding dark areas.", imageUrl: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5", relatedClassIds: ["RM04", "RM07"] },
            { id: "ency-02", tag: "Artists", category: "작가", title: "Vincent van Gogh", shortDesc: "Dutch Post-Impressionist painter.", fullDesc: "Vincent Willem van Gogh was a Dutch Post-Impressionist painter who is among the most famous and influential figures in the history of Western art.", imageUrl: "https://images.unsplash.com/photo-1541450805268-4822a3a774ca", relatedClassIds: ["RM12", "traditional-patterns"] },
            { id: "ency-03", tag: "Materials", category: "재료", title: "Graphite", shortDesc: "Mineral used for drawing pencils.", fullDesc: "Graphite is a crystalline form of the element carbon. It is the most stable form of carbon under standard conditions.", imageUrl: "https://images.unsplash.com/photo-1513542789411-b6a5d4f31634", relatedClassIds: ["RM10", "RM12"] },
            { id: "ency-04", tag: "Techniques", category: "기법", title: "Impasto", shortDesc: "Thick application of paint.", fullDesc: "Impasto is a technique used in painting, where paint is laid on an area of the surface in very thick layers, usually thick enough that the brush or painting-knife strokes are visible.", imageUrl: "https://images.unsplash.com/photo-1579762795188-aa33d23f8992", relatedClassIds: ["RM04", "RM07"] },
            { id: "ency-05", tag: "Movements", category: "미술사조", title: "Cubism", shortDesc: "Revolutionary 20th-century art style.", fullDesc: "Cubism is an early-20th-century avant-garde art movement that revolutionized European painting and sculpture.", imageUrl: "https://images.unsplash.com/photo-1577720580479-7d839d829c73", relatedClassIds: ["RM08", "seasonal-glasses"] },
            { id: "ency-06", tag: "Terms", category: "용어", title: "Golden Ratio", shortDesc: "1:1.618 mathematical proportion.", fullDesc: "The golden ratio is a mathematical ratio. It is commonly found in nature, and when used in a design, it fosters organic and natural-looking compositions that are aesthetically pleasing to the eye.", imageUrl: "https://images.unsplash.com/photo-1502472545331-db6746092be2", relatedClassIds: ["RM06", "RM12"] },
            { id: "ency-07", tag: "Artists", category: "작가", title: "Yayoi Kusama", shortDesc: "Contemporary Japanese artist.", fullDesc: "Yayoi Kusama is a Japanese contemporary artist who works primarily in sculpture and installation, but is also active in painting, performance, video art, fashion, poetry, fiction, and other arts.", imageUrl: "https://images.unsplash.com/photo-1533154683836-84ea7a0bc310", relatedClassIds: ["RM10", "RM12"] },
            { id: "ency-08", tag: "Materials", category: "재료", title: "Gesso", shortDesc: "Canvas primer and base.", fullDesc: "Gesso is a white paint mixture consisting of a binder mixed with chalk, gypsum, pigment, or any combination of these. It is used in artwork as a preparation for any number of substrates such as wood panels, canvas and sculpture.", imageUrl: "https://images.unsplash.com/photo-1513364776144-60967b0f800f", relatedClassIds: ["RM04", "RM05"] },
            { id: "ency-09", tag: "Techniques", category: "기법", title: "Sfumato", shortDesc: "Soft mixing of colors/tones.", fullDesc: "Sfumato is a technique used in painting, used for modeling forms in painting by which the lighted parts seem to stand out from surrounding dark areas.", imageUrl: "https://images.unsplash.com/photo-1578301978018-0242f4045248", relatedClassIds: ["RM04", "RM10"] },
            { id: "ency-10", tag: "Movements", category: "미술사조", title: "Impressionism", shortDesc: "Emphasis on light and movement.", fullDesc: "Impressionism is a 19th-century art movement characterized by relatively small, thin, yet visible brush strokes, open composition, emphasis on accurate depiction of light in its changing qualities.", imageUrl: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853", relatedClassIds: ["RM07", "RM08"] }
        ];

        mockEncy.forEach(item => {
            const ref = db.collection('encyclopedia').doc(item.id);
            batch.set(ref, {
                ...item,
                createdAt: firebase.firestore.FieldValue.serverTimestamp()
            });
        });

        try {
            await batch.commit();
            console.log("✅ Mock Data Successfully Uploaded!");
            alert("All mock data has been injected into Firestore!");
        } catch (error) {
            console.error("❌ Error committing batch:", error);
            alert("Failed to inject data. Check console.");
        }
    }
};
