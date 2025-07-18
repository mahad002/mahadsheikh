"use client";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, EffectCoverflow } from 'swiper/modules';
import { FaQuoteLeft, FaStar, FaStarHalf } from 'react-icons/fa';
import { HiLocationMarker } from 'react-icons/hi';
import clientReviews from '../data/Client_Reviews.json';
import { useMemo, useState, useEffect } from 'react';
import { useTheme } from './ThemeProvider';

import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const TestimonialSlider = () => {
  const { theme } = useTheme();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);

  const stats = useMemo(() => {
    const reviews = clientReviews.reviews;
    const totalReviews = reviews.length;
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = (totalRating / totalReviews).toFixed(1);
    const uniqueCountries = new Set(reviews.map(review => review.country)).size;
    
    return { totalReviews, averageRating, uniqueCountries };
  }, []);

  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<FaStar key={`star-${i}`} className="text-yellow-400" />);
    }

    if (hasHalfStar) {
      stars.push(<FaStarHalf key="half-star" className="text-yellow-400" />);
    }

    return stars;
  };

  const getInitials = (username) => {
    return username.slice(0, 2).toUpperCase();
  };

  const getRandomColor = (username) => {
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 'bg-purple-500',
      'bg-pink-500', 'bg-indigo-500', 'bg-red-500', 'bg-teal-500'
    ];
    const index = username.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[index % colors.length];
  };

  const formatDate = (dateString) => {
    if (!mounted) return ''; // Return empty string during SSR
    
    try {
      const date = new Date(dateString);
      const now = new Date();
      const diffTime = Math.abs(now - date);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      
      if (diffDays < 30) return `${diffDays} days ago`;
      if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
      return `${Math.floor(diffDays / 365)} years ago`;
    } catch {
      return dateString;
    }
  };

  if (!mounted) {
    return null; // Return null during SSR to prevent hydration mismatch
  }

  return (
    <div className="h-full flex flex-col">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <div className="bg-card rounded-2xl p-8 backdrop-blur-sm border border-border hover:border-accent/50 transition-all duration-300 transform hover:-translate-y-1">
          <div className="text-5xl font-bold text-accent mb-3">{stats.totalReviews}+</div>
          <div className="text-lg text-muted">Happy Clients</div>
        </div>
        <div className="bg-card rounded-2xl p-8 backdrop-blur-sm border border-border hover:border-accent/50 transition-all duration-300 transform hover:-translate-y-1">
          <div className="text-5xl font-bold text-accent mb-3">{stats.averageRating}</div>
          <div className="text-lg text-muted">Average Rating</div>
        </div>
        <div className="bg-card rounded-2xl p-8 backdrop-blur-sm border border-border hover:border-accent/50 transition-all duration-300 transform hover:-translate-y-1">
          <div className="text-5xl font-bold text-accent mb-3">{stats.uniqueCountries}</div>
          <div className="text-lg text-muted">Countries Served</div>
        </div>
      </div>

      {/* Testimonials Carousel */}
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        centeredSlides={true}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 50,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: false,
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
        }}
        navigation={true}
        modules={[EffectCoverflow, Pagination, Navigation]}
        className="testimonials-slider w-full"
      >
        {clientReviews.reviews.map((review, index) => (
          <SwiperSlide key={index} className="max-w-[800px]">
            <div className="bg-card backdrop-blur-sm rounded-2xl p-8 m-4 border border-border hover:border-accent/50 transition-all duration-300 transform hover:-translate-y-1">
              <div className="flex flex-col h-full">
                {/* Header */}
                <div className="flex items-center gap-6 mb-6">
                  <div className="relative flex-shrink-0">
                    <div className={`w-20 h-20 rounded-full overflow-hidden ring-4 ring-accent/20 ${getRandomColor(review.username)} flex items-center justify-center text-2xl font-bold text-white`}>
                      {getInitials(review.username)}
                    </div>
                    {review.first_letter && (
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-white text-sm font-bold shadow-lg">
                        {review.first_letter.toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-text mb-1">{review.username}</h3>
                    <div className="flex items-center gap-3 text-sm text-muted">
                      <div className="flex items-center gap-1">
                        <HiLocationMarker className="text-accent" />
                        <span>{review.country}</span>
                      </div>
                      {review.country_code && (
                        <span className="px-2 py-1 bg-accent/20 rounded-full text-xs font-semibold">
                          {review.country_code}
                        </span>
                      )}
                      <span className="text-accent" aria-hidden>•</span>
                      <span>{formatDate(review.time)}</span>
                    </div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-6">
                  <div className="flex gap-1 text-lg">
                    {renderStars(review.rating)}
                  </div>
                  <span className="text-accent font-bold text-lg">{review.rating.toFixed(1)}</span>
                </div>

                {/* Review */}
                <div className="relative">
                  <FaQuoteLeft className="text-5xl text-accent/20 absolute -top-4 -left-2" />
                  <p className="text-muted text-lg leading-relaxed pl-12 italic">
                    "{review.review}"
                  </p>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TestimonialSlider;