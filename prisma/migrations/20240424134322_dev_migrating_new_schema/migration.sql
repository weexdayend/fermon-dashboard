-- CreateTable
CREATE TABLE "fact_report_f5" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMP(6),
    "kode_provinsi" TEXT,
    "nama_provinsi" TEXT,
    "kode_kab_kota" TEXT,
    "nama_kab_kota" TEXT,
    "kode_distributor" TEXT,
    "nama_distributor" TEXT,
    "kode_produk" TEXT,
    "nama_produk" TEXT,
    "bulan" BIGINT,
    "tahun" BIGINT,
    "besaran" DOUBLE PRECISION,
    "total" DOUBLE PRECISION,
    "keterangan" TEXT,
    "status_processed" TEXT,
    "processed_at" TIMESTAMP(6),

    CONSTRAINT "fact_report_f5_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fact_report_f6" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMP(6),
    "kode_provinsi" TEXT,
    "nama_provinsi" TEXT,
    "kode_kab_kota" TEXT,
    "nama_kab_kota" TEXT,
    "kode_distributor" TEXT,
    "nama_distributor" TEXT,
    "kode_pengecer" TEXT,
    "nama_pengecer" TEXT,
    "kode_produk" TEXT,
    "nama_produk" TEXT,
    "bulan" BIGINT,
    "tahun" BIGINT,
    "besaran" DOUBLE PRECISION,
    "total" DOUBLE PRECISION,
    "keterangan" TEXT,
    "kode_kecamatan" TEXT,
    "nama_kecamatan" TEXT,
    "status_processed" TEXT,
    "processed_at" TIMESTAMP(6),

    CONSTRAINT "fact_report_f6_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mapping_profile" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMP(6) NOT NULL,
    "updated_at" TIMESTAMP(6),
    "deleted_at" TIMESTAMP(6),
    "id_provinsi" TEXT,
    "id_kabupaten" TEXT,
    "id_kecamatan" TEXT,
    "id_gudang" TEXT,
    "id_distributor" TEXT,
    "id_kios" TEXT,
    "status" BOOLEAN,
    "kategori" TEXT,

    CONSTRAINT "mapping_profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mart_accumulation_products_f5_distributor" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMP(6),
    "kode_distributor" TEXT,
    "nama_distributor" TEXT,
    "kode_produk" TEXT,
    "nama_produk" TEXT,
    "bulan" BIGINT,
    "tahun" BIGINT,
    "besaran" DOUBLE PRECISION,
    "total" DOUBLE PRECISION,
    "keterangan" TEXT,

    CONSTRAINT "mart_accumulation_products_f5_distributor_pk" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mart_accumulation_products_f6_kios" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMP(6) NOT NULL,
    "kode_pengecer" TEXT,
    "kode_produk" TEXT,
    "nama_produk" TEXT,
    "bulan" BIGINT,
    "tahun" BIGINT,
    "besaran" DOUBLE PRECISION,
    "total" DOUBLE PRECISION,
    "keterangan" TEXT,

    CONSTRAINT "mart_accumulation_products_f6_kios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "datawarehouse_f5" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMP(6),
    "kode_produsen" TEXT,
    "nama_produsen" TEXT,
    "no_f5" TEXT,
    "kode_distributor" TEXT,
    "nama_distributor" TEXT,
    "kode_provinsi" TEXT,
    "nama_provinsi" TEXT,
    "kode_kab_kota" TEXT,
    "nama_kab_kota" TEXT,
    "bulan" BIGINT,
    "tahun" BIGINT,
    "_status" TEXT,
    "kode_produk" TEXT,
    "nama_produk" TEXT,
    "stok_awal" DOUBLE PRECISION,
    "penebusan" DOUBLE PRECISION,
    "penyaluran" DOUBLE PRECISION,
    "stok_akhir" DOUBLE PRECISION,
    "keterangan" TEXT,
    "status_processed" TEXT,
    "processed_at" TIMESTAMP(6),

    CONSTRAINT "datawarehouse_f5_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "datawarehouse_f6" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMP(6),
    "kode_produsen" TEXT,
    "nama_produsen" TEXT,
    "no_f6" TEXT,
    "kode_distributor" TEXT,
    "nama_distributor" TEXT,
    "kode_provinsi" TEXT,
    "nama_provinsi" TEXT,
    "kode_kab_kota" TEXT,
    "nama_kab_kota" TEXT,
    "kode_kecamatan" TEXT,
    "nama_kecamatan" TEXT,
    "bulan" BIGINT,
    "tahun" BIGINT,
    "kode_pengecer" TEXT,
    "nama_pengecer" TEXT,
    "kode_produk" TEXT,
    "nama_produk" TEXT,
    "stok_awal" DOUBLE PRECISION,
    "penebusan" DOUBLE PRECISION,
    "penyaluran" DOUBLE PRECISION,
    "stok_akhir" DOUBLE PRECISION,
    "status" TEXT,
    "keterangan" TEXT,
    "status_processed" TEXT,
    "processed_at" TIMESTAMP(6),

    CONSTRAINT "datawarehouse_f6_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fact_profile" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMP(6),
    "updated_at" TIMESTAMP(6),
    "deleted_at" TIMESTAMP(6),
    "kategori" TEXT,
    "kode" TEXT,
    "nama" TEXT,
    "alamat" TEXT,
    "status" BOOLEAN,
    "id_mapping" TEXT,
    "long" TEXT,
    "lat" TEXT,

    CONSTRAINT "fact_profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fact_wilayah" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMP(6),
    "updated_at" TIMESTAMP(6),
    "deleted_at" TIMESTAMP(6),
    "kode" TEXT,
    "nama" TEXT,
    "long" TEXT,
    "lat" TEXT,
    "status" BOOLEAN,
    "kategori" TEXT,

    CONSTRAINT "fact_wilayah_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mapping_petugas" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMP(6),
    "updated_at" TIMESTAMP(6),
    "deleted_at" TIMESTAMP(6),
    "id_petugas" TEXT,
    "id_provinsi" TEXT,
    "id_kabupaten" TEXT,
    "id_kecamatan" TEXT,
    "id_gudang" TEXT,
    "id_distributor" TEXT,
    "id_kios" TEXT,
    "kategori" TEXT,
    "status_mapping" BOOLEAN,

    CONSTRAINT "mapping_petugas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mart_accumulation_products_f5_wilayah" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMP(6) NOT NULL,
    "kode_provinsi" TEXT,
    "kode_kab_kota" TEXT,
    "kode_produk" TEXT,
    "nama_produk" TEXT,
    "bulan" BIGINT,
    "tahun" BIGINT,
    "besaran" DOUBLE PRECISION,
    "total" DOUBLE PRECISION,
    "keterangan" TEXT,

    CONSTRAINT "mart_accumulation_products_f5_wilayah_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mart_accumulation_products_f6_wilayah" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMP(6) NOT NULL,
    "kode_provinsi" TEXT,
    "kode_kab_kota" TEXT,
    "kode_kecamatan" TEXT,
    "kode_produk" TEXT,
    "nama_produk" TEXT,
    "bulan" BIGINT,
    "tahun" BIGINT,
    "besaran" DOUBLE PRECISION,
    "total" DOUBLE PRECISION,
    "keterangan" TEXT,

    CONSTRAINT "mart_accumulation_products_f6_wilayah_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_alokasi_petugas" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" DATE,
    "updated_at" DATE,
    "deleted_at" DATE,
    "kodealokasi" TEXT,
    "idpetugas" UUID,
    "idgudang" UUID,
    "kodegudang" TEXT,
    "iddist" UUID,
    "kodedist" TEXT,
    "idkios" UUID,
    "kodekios" TEXT,
    "userid" UUID NOT NULL,

    CONSTRAINT "tbl_alokasi_petugas_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_alokasi_pupuk" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMP(6),
    "updated_at" TIMESTAMP(6),
    "deleted_at" TIMESTAMP(6),
    "tahun" BIGINT,
    "bulan" BIGINT,
    "nominal" DECIMAL,
    "kode" TEXT,

    CONSTRAINT "tbl_alokasi_pupuk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_distributor" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),
    "kode_distributor" BIGINT,
    "nama_distributor" TEXT,
    "longitude" TEXT,
    "latitude" TEXT,
    "kodeprov" TEXT,
    "provinsi" TEXT,
    "kodekab" TEXT,
    "kabupaten" TEXT,
    "kodekec" TEXT,
    "kecamatan" TEXT,
    "idgudang" UUID,
    "userid" UUID,

    CONSTRAINT "tbl_distributor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_gudang" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),
    "kodegudang" TEXT,
    "gudang" TEXT,
    "longitude" TEXT,
    "latitude" TEXT,
    "kodeprov" TEXT,
    "provinsi" TEXT,
    "kodekab" TEXT,
    "kabupaten" TEXT,
    "kodekec" TEXT,
    "kecamatan" TEXT,
    "userid" UUID NOT NULL,

    CONSTRAINT "tbl_gudang_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_harga_pupuk" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMP(6),
    "updated_at" TIMESTAMP(6),
    "deleted_at" TIMESTAMP(6),
    "id_provinsi" TEXT,
    "id_kabupaten" TEXT,
    "tahun" BIGINT,
    "bulan" BIGINT,
    "hargapukuk" DECIMAL,

    CONSTRAINT "tbl_harga_pupuk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_kios" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),
    "kode_kios" TEXT,
    "nama_kios" TEXT,
    "longitude" TEXT,
    "latitude" TEXT,
    "kodeprov" TEXT,
    "provinsi" TEXT,
    "kodekab" TEXT,
    "kabupaten" TEXT,
    "kodekec" TEXT,
    "kecamatan" TEXT,
    "id_distributor" UUID,
    "kode_distributor" TEXT,
    "userid" UUID,

    CONSTRAINT "tbl_kios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_petugas" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMP(6),
    "updated_at" TIMESTAMP(6),
    "deleted_at" TIMESTAMP(6),
    "kode_petugas" TEXT,
    "nama_petugas" TEXT,
    "contact" TEXT,
    "contact_wa" TEXT,
    "jabatan" TEXT,
    "status_petugas" BOOLEAN
);

-- CreateTable
CREATE TABLE "tbl_produsen" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),
    "kode_produsen" TEXT,
    "nama_produsen" TEXT,
    "idgudang" UUID,
    "userid" UUID,

    CONSTRAINT "tbl_produsen_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tbl_user" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "created_at" TIMESTAMP(3) NOT NULL,
    "updated_at" TIMESTAMP(3),
    "deleted_at" TIMESTAMP(3),
    "email" TEXT,
    "hashed" TEXT,
    "image" TEXT,
    "role" TEXT,
    "name" VARCHAR,
    "status_user" BOOLEAN,

    CONSTRAINT "tbl_user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "fact_report_f5_id_key" ON "fact_report_f5"("id");

-- CreateIndex
CREATE UNIQUE INDEX "fact_report_f6_id_key" ON "fact_report_f6"("id");

-- CreateIndex
CREATE UNIQUE INDEX "mapping_profile_id_provinsi_key" ON "mapping_profile"("id_provinsi");

-- CreateIndex
CREATE UNIQUE INDEX "mapping_profile_id_kabupaten_key" ON "mapping_profile"("id_kabupaten");

-- CreateIndex
CREATE UNIQUE INDEX "mapping_profile_id_kecamatan_key" ON "mapping_profile"("id_kecamatan");

-- CreateIndex
CREATE UNIQUE INDEX "mapping_profile_id_gudang_key" ON "mapping_profile"("id_gudang");

-- CreateIndex
CREATE UNIQUE INDEX "mapping_profile_id_distributor_key" ON "mapping_profile"("id_distributor");

-- CreateIndex
CREATE UNIQUE INDEX "mapping_profile_id_kios_key" ON "mapping_profile"("id_kios");

-- CreateIndex
CREATE INDEX "mapping_profile_id_provinsi_id_kabupaten_id_kecamatan_id_gu_idx" ON "mapping_profile"("id_provinsi", "id_kabupaten", "id_kecamatan", "id_gudang", "id_distributor", "id_kios");

-- CreateIndex
CREATE UNIQUE INDEX "mart_accumulation_products_f5_distributor_id_key" ON "mart_accumulation_products_f5_distributor"("id");

-- CreateIndex
CREATE UNIQUE INDEX "mart_accumulation_products_f6_kios_id_key" ON "mart_accumulation_products_f6_kios"("id");

-- CreateIndex
CREATE UNIQUE INDEX "datawarehouse_f5_id_key" ON "datawarehouse_f5"("id");

-- CreateIndex
CREATE UNIQUE INDEX "datawarehouse_f6_id_key" ON "datawarehouse_f6"("id");

-- CreateIndex
CREATE UNIQUE INDEX "fact_profile_kode_key" ON "fact_profile"("kode");

-- CreateIndex
CREATE UNIQUE INDEX "fact_wilayah_kode_key" ON "fact_wilayah"("kode");

-- CreateIndex
CREATE UNIQUE INDEX "mapping_petugas_id_key" ON "mapping_petugas"("id");

-- CreateIndex
CREATE UNIQUE INDEX "mart_accumulation_products_f5_wilayah_id_key" ON "mart_accumulation_products_f5_wilayah"("id");

-- CreateIndex
CREATE UNIQUE INDEX "mart_accumulation_products_f6_wilayah_id_key" ON "mart_accumulation_products_f6_wilayah"("id");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_alokasi_petugas_id_key" ON "tbl_alokasi_petugas"("id");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_alokasi_pupuk_id_key" ON "tbl_alokasi_pupuk"("id");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_distributor_id_key" ON "tbl_distributor"("id");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_gudang_id_key" ON "tbl_gudang"("id");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_harga_pupuk_id_key" ON "tbl_harga_pupuk"("id");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_kios_id_key" ON "tbl_kios"("id");

-- CreateIndex
CREATE INDEX "petugas_id_idx" ON "tbl_petugas"("id", "kode_petugas", "contact", "contact_wa");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_petugas_id_key" ON "tbl_petugas"("id");

-- CreateIndex
CREATE INDEX "tbl_produsen_id_idx" ON "tbl_produsen"("id");

-- CreateIndex
CREATE UNIQUE INDEX "tbl_user_id_key" ON "tbl_user"("id");

-- AddForeignKey
ALTER TABLE "mapping_profile" ADD CONSTRAINT "mapping_profile_id_provinsi_fkey" FOREIGN KEY ("id_provinsi") REFERENCES "fact_wilayah"("kode") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mapping_profile" ADD CONSTRAINT "mapping_profile_id_kabupaten_fkey" FOREIGN KEY ("id_kabupaten") REFERENCES "fact_wilayah"("kode") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mapping_profile" ADD CONSTRAINT "mapping_profile_id_kecamatan_fkey" FOREIGN KEY ("id_kecamatan") REFERENCES "fact_wilayah"("kode") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mapping_profile" ADD CONSTRAINT "mapping_profile_id_gudang_fkey" FOREIGN KEY ("id_gudang") REFERENCES "fact_profile"("kode") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mapping_profile" ADD CONSTRAINT "mapping_profile_id_distributor_fkey" FOREIGN KEY ("id_distributor") REFERENCES "fact_profile"("kode") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "mapping_profile" ADD CONSTRAINT "mapping_profile_id_kios_fkey" FOREIGN KEY ("id_kios") REFERENCES "fact_profile"("kode") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tbl_kios" ADD CONSTRAINT "tbl_kios_id_distributor_fkey" FOREIGN KEY ("id_distributor") REFERENCES "tbl_distributor"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_produsen" ADD CONSTRAINT "tbl_produsen_idgudang_fkey" FOREIGN KEY ("idgudang") REFERENCES "tbl_gudang"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tbl_produsen" ADD CONSTRAINT "tbl_produsen_userid_fkey" FOREIGN KEY ("userid") REFERENCES "tbl_user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
