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

        public virtual DbSet<Comments> Comments { get; set; }
        public virtual DbSet<Equipments> Equipments { get; set; }
        public virtual DbSet<EquipmentsToGroup> EquipmentsToGroup { get; set; }
        public virtual DbSet<Games> Games { get; set; }
        public virtual DbSet<Groups> Groups { get; set; }
        public virtual DbSet<HeroeStats> HeroeStats { get; set; }
        public virtual DbSet<Heroes> Heroes { get; set; }
        public virtual DbSet<Invitations> Invitations { get; set; }
        public virtual DbSet<ItemStats> ItemStats { get; set; }
        public virtual DbSet<Items> Items { get; set; }
        public virtual DbSet<Likes> Likes { get; set; }
        public virtual DbSet<UserHeroesLvl> UserHeroesLvl { get; set; }
        public virtual DbSet<UserToGroups> UserToGroups { get; set; }
        public virtual DbSet<Users> Users { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("Server=.\\SQLEXPRESS;Database=EquipmentBuilderDB;Trusted_Connection=True;");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Comments>(entity =>
            {
                entity.Property(e => e.Comment).IsUnicode(false);

                entity.Property(e => e.Tmstmp).HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.Equipment)
                    .WithMany(p => p.Comments)
                    .HasForeignKey(d => d.EquipmentId)
                    .HasConstraintName("FK_EquipmentsComments_Id");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Comments)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_UsersComments_Id");
            });

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

                entity.HasOne(d => d.Game)
                    .WithMany(p => p.Equipments)
                    .HasForeignKey(d => d.GameId)
                    .HasConstraintName("FK_Equipments_GameId");

                entity.HasOne(d => d.Hero)
                    .WithMany(p => p.Equipments)
                    .HasForeignKey(d => d.HeroId)
                    .OnDelete(DeleteBehavior.Cascade)
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
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_Users_Id");
            });

            modelBuilder.Entity<EquipmentsToGroup>(entity =>
            {
                entity.HasOne(d => d.Equipment)
                    .WithMany(p => p.EquipmentsToGroup)
                    .HasForeignKey(d => d.EquipmentId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_EquipmentsToGroupEquipments_Id");

                entity.HasOne(d => d.Group)
                    .WithMany(p => p.EquipmentsToGroup)
                    .HasForeignKey(d => d.GroupId)
                    .HasConstraintName("FK_EquipmentsToGroupGroups_Id");
            });

            modelBuilder.Entity<Games>(entity =>
            {
                entity.Property(e => e.GameName).IsUnicode(false);
            });

            modelBuilder.Entity<Groups>(entity =>
            {
                entity.Property(e => e.GroupName).IsUnicode(false);

                entity.HasOne(d => d.GroupAdmin)
                    .WithMany(p => p.Groups)
                    .HasForeignKey(d => d.GroupAdminId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_UsersGroup_Id");
            });

            modelBuilder.Entity<HeroeStats>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.HasOne(d => d.Hero)
                    .WithMany(p => p.HeroeStats)
                    .HasForeignKey(d => d.HeroId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_Heroes_Id");
            });

            modelBuilder.Entity<Heroes>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.HeroName).IsUnicode(false);

                entity.HasOne(d => d.Game)
                    .WithMany(p => p.Heroes)
                    .HasForeignKey(d => d.GameId)
                    .HasConstraintName("FK_Heroes_GameId");
            });

            modelBuilder.Entity<Invitations>(entity =>
            {
                entity.Property(e => e.Tmstmp).HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.Group)
                    .WithMany(p => p.Invitations)
                    .HasForeignKey(d => d.GroupId)
                    .HasConstraintName("FK_InvitationsGroup_Id");

                entity.HasOne(d => d.UserAdresser)
                    .WithMany(p => p.InvitationsUserAdresser)
                    .HasForeignKey(d => d.UserAdresserId)
                    .HasConstraintName("FK_InvitationsUsersAdresser_Id");

                entity.HasOne(d => d.UserRecipient)
                    .WithMany(p => p.InvitationsUserRecipient)
                    .HasForeignKey(d => d.UserRecipientId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_InvitationsUsersRecipients_Id");
            });

            modelBuilder.Entity<ItemStats>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.Descriptions).IsUnicode(false);

                entity.HasOne(d => d.IdNavigation)
                    .WithOne(p => p.ItemStats)
                    .HasForeignKey<ItemStats>(d => d.Id)
                    .HasConstraintName("FK_Items_Id");
            });

            modelBuilder.Entity<Items>(entity =>
            {
                entity.Property(e => e.Id).ValueGeneratedNever();

                entity.Property(e => e.ItemName).IsUnicode(false);

                entity.HasOne(d => d.Game)
                    .WithMany(p => p.Items)
                    .HasForeignKey(d => d.GameId)
                    .HasConstraintName("FK_Items_GameId");
            });

            modelBuilder.Entity<Likes>(entity =>
            {
                entity.Property(e => e.Tmstmp).HasDefaultValueSql("(getdate())");

                entity.HasOne(d => d.Equipment)
                    .WithMany(p => p.Likes)
                    .HasForeignKey(d => d.EquipmentId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_LikesEquipments_Id");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.Likes)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_LikesUsers_Id");
            });

            modelBuilder.Entity<UserHeroesLvl>(entity =>
            {
                entity.HasOne(d => d.Equipment)
                    .WithMany(p => p.UserHeroesLvl)
                    .HasForeignKey(d => d.EquipmentId)
                    .HasConstraintName("FK_UserHeroesLvlEquipment_Id");

                entity.HasOne(d => d.Hero)
                    .WithMany(p => p.UserHeroesLvl)
                    .HasForeignKey(d => d.HeroId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_UserHeroesLvlHeroes_Id");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserHeroesLvl)
                    .HasForeignKey(d => d.UserId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_UserHeroesLvlUsers_Id");
            });

            modelBuilder.Entity<UserToGroups>(entity =>
            {
                entity.HasOne(d => d.Group)
                    .WithMany(p => p.UserToGroups)
                    .HasForeignKey(d => d.GroupId)
                    .OnDelete(DeleteBehavior.Cascade)
                    .HasConstraintName("FK_UserToGroupsGroups_Id");

                entity.HasOne(d => d.User)
                    .WithMany(p => p.UserToGroups)
                    .HasForeignKey(d => d.UserId)
                    .HasConstraintName("FK_UserToGroupsUsers_Id");
            });

            modelBuilder.Entity<Users>(entity =>
            {
                entity.Property(e => e.Email).IsUnicode(false);

                entity.Property(e => e.FirstName).IsUnicode(false);

                entity.Property(e => e.IsAdmin).HasDefaultValueSql("((0))");

                entity.Property(e => e.Surname).IsUnicode(false);

                entity.Property(e => e.UserName).IsUnicode(false);
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
