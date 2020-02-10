using System;
using EquipmentBuilder.API.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;

namespace EquipmentBuilder.API.Context
{
    public partial class DataContext : DbContext
    {
        public DataContext()
        {
        }

        public DataContext(DbContextOptions<DataContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Equipments> Equipments { get; set; }
        public virtual DbSet<HeroeStats> HeroeStats { get; set; }
        public virtual DbSet<Heroes> Heroes { get; set; }
        public virtual DbSet<ItemStats> ItemStats { get; set; }
        public virtual DbSet<Items> Items { get; set; }
        public virtual DbSet<Users> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            /*if (!optionsBuilder.IsConfigured)
            {
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. See http://go.microsoft.com/fwlink/?LinkId=723263 for guidance on storing connection strings.
                optionsBuilder.UseSqlServer("Server=ADMIN-KOMPUTER\\SQLEXPRESS;Database=EquipmentBuilderDB;Trusted_Connection=True;");
            }*/
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Equipments>(entity =>
            {
                entity.Property(e => e.EqName).IsUnicode(false);

                entity.HasOne(d => d.FifthItem)
                    .WithMany(p => p.EquipmentsFifthItem)
                    .HasForeignKey(d => d.FifthItemId)
                    .HasConstraintName("FK_Equipments_FifthItemId_Id");

                entity.HasOne(d => d.FirtItem)
                    .WithMany(p => p.EquipmentsFirtItem)
                    .HasForeignKey(d => d.FirtItemId)
                    .HasConstraintName("FK_Equipments_FirtItemId_Id");

                entity.HasOne(d => d.FourthItem)
                    .WithMany(p => p.EquipmentsFourthItem)
                    .HasForeignKey(d => d.FourthItemId)
                    .HasConstraintName("FK_Equipments_FourthItemId_Id");

                entity.HasOne(d => d.Hero)
                    .WithMany(p => p.Equipments)
                    .HasForeignKey(d => d.HeroId)
                    .HasConstraintName("FK_Equipments_Heroes_Id");

                entity.HasOne(d => d.SecondItem)
                    .WithMany(p => p.EquipmentsSecondItem)
                    .HasForeignKey(d => d.SecondItemId)
                    .HasConstraintName("FK_Equipments_SecondItemId_Id");

                entity.HasOne(d => d.SixthItem)
                    .WithMany(p => p.EquipmentsSixthItem)
                    .HasForeignKey(d => d.SixthItemId)
                    .HasConstraintName("FK_Equipments_SixthItemId_Id");

                entity.HasOne(d => d.ThirdItem)
                    .WithMany(p => p.EquipmentsThirdItem)
                    .HasForeignKey(d => d.ThirdItemId)
                    .HasConstraintName("FK_Equipments_ThirdItemId_Id");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Equipments)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_Users_Id");
            });

            modelBuilder.Entity<HeroeStats>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.HasOne(d => d.IdNavigation)
                    .WithOne(p => p.HeroeStats)
                    .HasForeignKey<HeroeStats>(d => d.Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Heroes_Id");
            });

            modelBuilder.Entity<Heroes>(entity =>
            {
                entity.Property(e => e.HeroName).IsUnicode(false);
            });

            modelBuilder.Entity<ItemStats>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedOnAdd();

                entity.Property(e => e.Descriptions).IsUnicode(false);

                entity.HasOne(d => d.IdNavigation)
                    .WithOne(p => p.ItemStats)
                    .HasForeignKey<ItemStats>(d => d.Id)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Items_Id");
            });

            modelBuilder.Entity<Items>(entity =>
            {
                entity.Property(e => e.ItemName).IsUnicode(false);
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.Property(e => e.IsAdmin).HasDefaultValueSql("((0))");

                entity.Property(e => e.UserName).IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
