using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using EquipmentBuilder.API.Context;
using EquipmentBuilder.API.Data;
using EquipmentBuilder.API.Data.Interfaces;
using EquipmentBuilderWebApp.Helpers;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;

namespace EquipmentBuilderWebApp
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            
            services.AddDbContext<DataContext>(x =>
            {
                x.UseSqlServer(Configuration.GetConnectionString("DefaultConnection"));
            });
            services.AddControllers();
            services.AddCors(); //pozwala na uzycie middleware 
            services.AddAutoMapper(typeof(EquipmentRepository).Assembly); // dodanie automappera - w konstruktorze określamy, która klasa ma mieć "dane" dla mppera - które assemby ma mieć profile dla mappera
            //services.AddSingleton(); //nie bardzo je�eli chodzi o r�wnoleg�e rz�dania
            //services.AddTransient();// dla lekkich - ci�gle tworzy nowe obiekty przy rz�daniu          
            services.AddScoped<IAuthRepository, AuthRepository>(); //dla kazdego rz�dania tworzy nowy obiekt, ale je�eli z tego samego ip to nie tworzy
            services.AddScoped<IEquipmentRepository, EquipmentRepository>();
            services.AddScoped<IInvitationRepository, InvitationRepository>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IGroupRepository, GroupRepository>();

            services.AddScoped<ICommentRepository, CommentRepository>();
            services.AddScoped<ILikeRepository, LikeRepository>();

            services.AddScoped<IItemsRepository, ItemsRepository>();
            services.AddScoped<IHeroesRepository, HeroesRepository>();
            services.AddScoped<IStatisticsRepository, StatisticsRepository>();

            //gorny zapis oznacza ze wstrzykujemy interfejs IAuthRepository a po przecinku jego konkretna implementacje
            //NA CZAS TESTOW API
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuerSigningKey = true,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII
                            .GetBytes(Configuration.GetSection("AppSettings:Token").Value)),
                        ValidateIssuer = false,
                        ValidateAudience = false
                    };
                });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                //dodanie globlnego exception handlera w produckcyjnym trybie
                app.UseExceptionHandler(builder => {
                    builder.Run( async context => {
                        context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                        var error = context.Features.Get<IExceptionHandlerFeature>();
                        if(error != null)
                        {
                            context.Response.AddAppError(error.Error.Message);
                            await context.Response.WriteAsync(error.Error.Message);
                        }
                    });
                });
            }
            //app.UseHttpsRedirection();

            app.UseRouting();

            //NA CZAS TESTOW API!!!
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseCors(x => x.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });
        }
    }
}
