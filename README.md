# Vite & React CRUD Uygulaması

Bu proje, modern web geliştirme standartları takip edilerek React, Vite ve Tailwind CSS kullanılarak geliştirilmiş bir kullanıcı yönetim (CRUD) uygulamasıdır.

## 🚀 Özellikler

- **Modern Javascript Çerçevesi**: React 19 ve Vite altyapısı kullanıldı.
- **TypeScript Desteği**: Tip güvenliği için kapsamlı interface tanımlamaları yapıldı.
- **Premium Tasarım**: Tailwind CSS 4 ile modern, responsive ve göze hitap eden bir arayüz tasarlandı.
- **CRUD Operasyonları**:
    - **Ekle**: Yeni kullanıcı ekleme formu.
    - **Listele**: API ve yerel verilerin şık kartlar ile listelenmesi.
    - **Güncelleme**: Mevcut kullanıcı bilgilerini düzenleme.
    - **Silme**: Kullanıcı kaydını sistemden kaldırma.
- **Veri Yönetimi**: 
    - İlk veriler **JSONPlaceholder API** üzerinden çekilir.
    - Tüm değişiklikler **LocalStorage** üzerinde kalıcı olarak saklanır.
- **Netlify Uyumlu**: Proje Netlify üzerinde yayına hazır haldedir.

## 📁 Proje Yapısı

```text
src/
├── Components/    # Reusable UI Bileşenleri (UserCard, UserForm, UserList)
├── Pages/         # Sayfa Bileşenleri (HomePage)
├── Interfaces/    # TypeScript Tip Tanımlamaları (User.ts)
├── App.tsx        # Ana Uygulama Girişi
└── index.css      # Global Stiller ve Tailwind Konfigürasyonu
```

## 🛠️ Kurulum ve Çalıştırma

1. Gerekli node.js uygulamasını yükleyin:
   ```bash
   npm install
   ```

2. Uygulamayı geliştirme modunda çalıştırın:
   ```bash
   npm run dev
   ```

3. Üretim build'i oluşturun:
   ```bash
   npm run build
   ```

## 🌐 Netlify



---
*Geliştirici: Emin Dalkılıç*
