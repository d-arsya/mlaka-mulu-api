# ✈️ Mlaku-Mulu Adventure Hub API

Backend REST API untuk pendataan turis dan perjalanan Biro Perjalanan **Mlaku-Mulu**.

Aplikasi ini dibuat untuk memenuhi **Asesmen Intern Backend Engineer**.
Proyek dibangun dengan **NestJS**, **TypeScript**, dan **PostgreSQL**, serta menyediakan dokumentasi API lengkap.

---

## 🚀 Teknologi Utama

- **NestJS** – Framework utama Backend
- **TypeScript** – Bahasa pemrograman dengan static typing
- **PostgreSQL** – Database relasional
- **TypeORM** – ORM
- **JWT Authentication** – Proteksi endpoint
- **Swagger (OpenAPI)** – Dokumentasi API
- **Postman Collection** – Dokumentasi pengujian endpoint

---
## 👤 Dummy User (Seeder)

Untuk memudahkan pengujian API, aplikasi ini menyediakan **data dummy user** yang otomatis dibuat melalui database seeder.

| Role     | Email                                             | Password |
| -------- | ------------------------------------------------- | -------- |
| owner    | [owner@gmail.com](mailto:owner@gmail.com)         | password |
| employee | [employee1@gmail.com](mailto:employee1@gmail.com) | password |
| tourist  | [tourist1@gmail.com](mailto:tourist1@gmail.com)   | password |

---
## 🌐 URL Penting

| Kebutuhan               | URL                                                                                                                                                                                                                                  |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Deployment Base URL** | [https://mlakamulu-api.disyfa.space/api](https://mlakamulu-api.disyfa.space/api)                                                                                                                                                     |
| **Swagger Docs**        | [https://mlakamulu-api.disyfa.space](https://mlakamulu-api.disyfa.space)                                                                                                                                                             |
| **GitHub Repository**   | [https://github.com/d-arsya/mlaka-mulu-api](https://github.com/d-arsya/mlaka-mulu-api)                                                                                                                                               |
| **Postman Collection**  | [https://www.postman.com/research-geoscientist-77252011/datacakra/collection/9ccn278/mlaku-mulu-adventure-hub-api](https://www.postman.com/research-geoscientist-77252011/datacakra/collection/9ccn278/mlaku-mulu-adventure-hub-api) |

---

## 👥 Role & Hak Akses

Aplikasi menggunakan **Role-Based Access Control (RBAC)** dengan role berikut:

- **owner** – akses kelola karyawan
- **employee** – kelola turis, destinasi, trip, booking
- **tourist** – melihat riwayat perjalanan sendiri, membuat booking, melihat destinasi dan trip

Endpoint tertentu hanya dapat diakses pegawai/owner.

---

## ✨ Fitur Utama

### 1. Autentikasi

- `POST /auth/register` – Registrasi
- `POST /auth/login` – Login (menghasilkan JWT token)

### 2. Manajemen User (Pegawai/Owner)

- `POST /user`
- `GET /user`
- `GET /user/{id}`
- `PATCH /user/{id}`
- `DELETE /user/{id}`

### 3. Manajemen Destinasi (Pegawai/Owner)

- `POST /destination`
- `GET /destination`
- `GET /destination/{id}`
- `PATCH /destination/{id}`
- `DELETE /destination/{id}`

### 4. Manajemen Trip (Pegawai/Owner)

- `POST /trip`
- `GET /trip`
- `GET /trip/{id}`
- `PATCH /trip/{id}`
- `DELETE /trip/{id}`

Format date wajib **UTC** (ISO 8601, berakhiran `Z`).

### 5. Manajemen Booking

- `POST /booking`
- `GET /booking`
- `GET /booking/{id}`
- `PATCH /booking/{id}`

Ketika booking mencapai status **paid**, sistem otomatis membuat entitas **TouristTrip**.

### 6. Riwayat Perjalanan Turis

- `GET /tourist-trip`
- `GET /tourist-trip/{id}`

Turis hanya dapat melihat riwayat miliknya sendiri.

---

## 📦 Instalasi & Menjalankan Secara Lokal

### 1. Clone Repo

```bash
git clone https://github.com/d-arsya/mlaka-mulu-api.git
cd mlaka-mulu-api
```

### 2. Install dependency

```bash
npm install
# atau
pnpm install
```

### 3. Buat file `.env`

```
DB_HOST=1127.0.0.1
DB_PORT=10000
DB_USER=admin
DB_PASSWORD=admin
DB_NAME=mlaka_mulu_api
JWT_SECRET=1234567890
```

### 4. Jalankan migrasi dan seeder

```bash
npm run db:up
npm run db:seed
```

### 5. Jalankan aplikasi

```bash
npm run start:dev
```

Aplikasi tersedia pada:
📍 `http://localhost:3000/api`

Swagger Docs:
📍 `http://localhost:3000`

---

## 📘 Dokumentasi API

### Swagger (OpenAPI)

Tersedia otomatis pada root URL:

🔗 [https://mlakamulu-api.disyfa.space/](https://mlakamulu-api.disyfa.space/)

### Postman Collection

Sudah siap impor untuk pengujian:

🔗 [https://www.postman.com/research-geoscientist-77252011/datacakra/collection/9ccn278/mlaku-mulu-adventure-hub-api](https://www.postman.com/research-geoscientist-77252011/datacakra/collection/9ccn278/mlaku-mulu-adventure-hub-api)

---

## 🧩 Tambahan Fitur Opsional

- Auto-create TouristTrip saat booking paid
- Database seeder untuk data dummy
- Turis dapat melihat destinasi dan trip sebelum booking(guest access)
- Pengadaan paket Trip dengan beberapa destinasi
- Turis dapat memesan beberapa paket trip dalam sekali book dan otomatis terhitung dalam bill

---

## 🛠️ Struktur Proyek (Singkat)

```
src/
  auth/
  booking/
  casl/
  common/
  database/
  destination/
  tourist-trip/
  trip/
  user/
```
