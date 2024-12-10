using Domain.Entities;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Infrastructure.Data.Configurations
{
    public class ProductConfiguration : IEntityTypeConfiguration<Product>
    {
        public void Configure(EntityTypeBuilder<Product> builder)
        {
            builder.Property(p => p.Name)
              .IsRequired()
              .HasMaxLength(100);

            builder.Property(p => p.Price)
             .IsRequired();

            builder.Property(p => p.Quantity)
               .IsRequired();

            builder.HasOne(p => p.ProductGroup) 
              .WithMany(pg => pg.Products)
              .HasForeignKey(p => p.ProductGroupId)
              .OnDelete(DeleteBehavior.SetNull);
        }
    }
}
