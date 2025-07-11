// app/gallery/page.tsx
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { PROJECTS, EQUIPMENT } from '@/lib/constants';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectCoverflow } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-coverflow';

const Gallery = () => {
  // Breakpoints for responsive swiper
  const breakpoints = {
    320: {
      slidesPerView: 1,
      spaceBetween: 10,
    },
    640: {
      slidesPerView: 1,
      spaceBetween: 20,
    },
    768: {
      slidesPerView: 2,
      spaceBetween: 30,
    },
    1024: {
      slidesPerView: 3,
      spaceBetween: 40,
    },
  };

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-secondary to-primary text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1663296997689-f5e35ad7ac7d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjB8fG9pbCUyMGFuZCUyMGdhcyUyMGVuZ2luZWVyaW5nJTIwTmlnZXJpYXxlbnwwfHwwfHx8MA%3D%3D?w=1920&h=1080&fit=crop"
            alt="Background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>

        <div className="container mx-auto px-4 relative text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">Project Gallery</h1>
          <p className="text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
            Visual showcase of our completed projects across various sectors and locations.
          </p>
        </div>
      </section>

      {/* Featured Projects Slider */}
      <section className="hidden py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary mb-4">Featured Projects</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              Highlights from our portfolio of successful engineering projects
            </p>
          </div>

          <div className="px-2 sm:px-4">
            <Swiper
              effect={'coverflow'}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={'auto'}
              coverflowEffect={{
                rotate: 0,
                stretch: 0,
                depth: 100,
                modifier: 2.5,
                slideShadows: false,
              }}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              modules={[EffectCoverflow, Pagination, Navigation]}
              className="featuredSwiper"
              breakpoints={{
                640: {
                  coverflowEffect: {
                    rotate: 0,
                    stretch: 0,
                    depth: 100,
                    modifier: 2.5,
                  }
                },
                1024: {
                  coverflowEffect: {
                    rotate: 0,
                    stretch: -50,
                    depth: 200,
                    modifier: 2,
                  }
                }
              }}
            >
              {PROJECTS.map((project, index) => (
                <SwiperSlide key={index} className="max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg">
                  <Card className="border-0 shadow-xl rounded-lg overflow-hidden group h-full">
                    <CardContent className="p-0 h-full flex flex-col">
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={project.image}
                          alt={project.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6 flex-grow">
                        <div className="h-1 w-20 bg-gradient-to-r from-primary to-secondary mb-4"></div>
                        <h3 className="text-xl sm:text-2xl font-bold text-secondary mb-3">{project.title}</h3>
                        <p className="text-gray-600 mb-4">{project.description || 'Engineering excellence at its finest'}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-sm font-medium text-primary">{project.location}</span>
                          {project.date && <span className="text-sm text-gray-500">{project.date}</span>}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* Project Categories */}
      <section className="hidden py-16 sm:py-20 bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary mb-4">Project Categories</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              Explore our work across different engineering disciplines
            </p>
          </div>

          <div className="px-2 sm:px-4">
            <Swiper
              slidesPerView={1}
              spaceBetween={20}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 30,
                },
              }}
              modules={[Pagination]}
              className="categorySwiper"
            >
              {[
                {
                  title: "Infrastructure",
                  description: "Roads, bridges, and public works projects",
                  image: "/uploads/p5.jpg?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW5mcmFzdHJ1Y3R1cmUlMjBuaWdlcmlhfGVufDB8fDB8fHww?w=800&h=600&fit=crop",
                },
                {
                  title: "Oil & Gas",
                  description: "Pipeline construction and facility development",
                  image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8b2lsJTIwZ2FzJTIwZmFjaWxpdHl8ZW58MHx8MHx8fDA%3D?w=800&h=600&fit=crop",
                },
                {
                  title: "Marine",
                  description: "Offshore installations and port facilities",
                  image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fG1hcmluZSUyMGNvbnN0cnVjdGlvbnxlbnwwfHwwfHx8MA%3D%3D?w=800&h=600&fit=crop",
                },
                {
                  title: "Industrial",
                  description: "Factory and plant construction",
                  image: "/uploads/p3.jpg?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8aW5kdXN0cmlhbCUyMGNvbnN0cnVjdGlvbnxlbnwwfHwwfHx8MA%3D%3D?w=800&h=600&fit=crop",
                },
              ].map((category, index) => (
                <SwiperSlide key={index} className="pb-10">
                  <Card className="border-0 shadow-lg rounded-lg overflow-hidden group h-full">
                    <CardContent className="p-0 h-full">
                      <div className="aspect-video overflow-hidden">
                        <img
                          src={category.image}
                          alt={category.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-6">
                        <h3 className="text-xl font-bold text-secondary mb-2">{category.title}</h3>
                        <p className="text-gray-600">{category.description}</p>
                      </div>
                    </CardContent>
                  </Card>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>

      {/* Full Project Gallery */}
      <section className="py-16 sm:py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl hidden sm:text-4xl md:text-5xl font-bold text-secondary mb-4">Project Gallery</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              Browse through our gallery
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {EQUIPMENT.flatMap((project, i) =>  (
                <div key={`${i}`} className="group relative overflow-hidden rounded-lg aspect-square">
                  <img
                    src={project.image}
                    alt={` ${i + 1}`}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div>
                      <h3 className="text-white font-bold text-lg">{project.name}</h3>
                      <p className="text-white/80 text-sm">{project.location}</p>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>

          <div className="mt-12 text-center">
            <button className="px-8 py-3 bg-primary text-white font-medium rounded-full hover:bg-primary/90 transition-colors duration-300">
              Load More Projects
            </button>
          </div>
        </div>
      </section>

      {/* Testimonials Slider */}
      <section className="py-16 sm:py-20 bg-accent/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-secondary mb-4">Client Testimonials</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
              What our clients say about working with us
            </p>
          </div>

          <div className="max-w-4xl mx-auto px-4">
            <Swiper
              slidesPerView={1}
              spaceBetween={30}
              loop={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              pagination={{
                clickable: true,
              }}
              modules={[Autoplay, Pagination]}
              className="testimonialSwiper"
            >
              {[
                {
                  quote: "The team delivered our pipeline project ahead of schedule while maintaining excellent safety standards.",
                  name: "John Adekunle",
                  position: "Project Manager, NNPC",
                },
                {
                  quote: "Their attention to detail and engineering expertise was evident throughout our refinery expansion project.",
                  name: "Amina Mohammed",
                  position: "Director, Dangote Refinery",
                },
                {
                  quote: "Reliable, professional, and technically competent. We've partnered with them on multiple projects.",
                  name: "Chukwuma Okoro",
                  position: "CEO, Sterling Oil",
                },
              ].map((testimonial, index) => (
                <SwiperSlide key={index}>
                  <div className="bg-white p-8 sm:p-10 rounded-xl shadow-lg text-center">
                    <svg className="w-12 h-12 mx-auto text-primary mb-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
                    </svg>
                    <p className="text-lg sm:text-xl text-gray-700 mb-6">{testimonial.quote}</p>
                    <div>
                      <p className="font-bold text-secondary">{testimonial.name}</p>
                      <p className="text-gray-500 text-sm">{testimonial.position}</p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Gallery;