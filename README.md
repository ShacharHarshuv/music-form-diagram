<img src="https://github.com/user-attachments/assets/8d64eba2-ff50-424f-a5ec-97862088c43d" alt="open-formata" width="400" />

# Open Formata

**Open Formata** is the open source app for creating beautiful musical form diagrams quickly. I created this for myself to help me analyze more songs faster and learn about musical form. You can define the number of bars, and split them into nested sections with
descriptions, colors, and notes.

![image](https://github.com/user-attachments/assets/39555dcd-ce61-42e4-894b-7102308e1612)

## Examples

- [Proud of Your Boy](https://openformata.com/?id=4fefb4ba-2802-4936-b538-232b0b8ee36b) (from Aladdin, by Alan Menken)
- [Kidnap the Sandy Claws](https://openformata.com/?id=05b02942-4ae9-46a8-94c7-78b336f80071) (from The Nightmare Before Christmas, by Danny Elfman)
- [Put On Your Sunday Clothes](https://openformata.com/?id=fe8c2e1a-8766-45da-bdb7-e448d9b93d33) (from Hello, Dolley!, by Jerry Herman)

## Contributions

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

Pull requests are welcome!

## Firebase Setup (Required for Sharing)

This project uses Firebase Firestore for document sharing functionality. To set up Firebase:

1. Create a Firebase project at [https://console.firebase.google.com/](https://console.firebase.google.com/)
2. Enable Firestore Database in your project
3. Create a `.env` file in the root directory with your Firebase API key:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
```

4. Configure Firestore security rules to allow read/write access to the `diagrams` collection

Note: the app code assumes domains as described in src/app/firebase/db.ts. If you want to test this with a different connection, you can change those values locally.
