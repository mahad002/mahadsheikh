"use client";
import { useMemo } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement } from 'chart.js';
import { Pie, Bar } from 'react-chartjs-2';
import clientReviews from '../data/Client_Reviews.json';

ChartJS.register(ArcElement, CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const ClientAnalytics = () => {
  const analytics = useMemo(() => {
    const reviews = clientReviews.reviews;
    
    // Country distribution
    const countryCount = reviews.reduce((acc, review) => {
      const country = review.country || 'Unknown';
      acc[country] = (acc[country] || 0) + 1;
      return acc;
    }, {});

    // Rating distribution
    const ratingCount = reviews.reduce((acc, review) => {
      const rating = Math.floor(review.rating);
      acc[rating] = (acc[rating] || 0) + 1;
      return acc;
    }, {});

    // Calculate total reviews and average rating
    const totalReviews = reviews.length;
    const averageRating = (reviews.reduce((sum, review) => sum + review.rating, 0) / totalReviews).toFixed(1);

    // Get unique countries count
    const uniqueCountries = new Set(reviews.map(review => review.country)).size;

    return {
      countryCount,
      ratingCount,
      totalReviews,
      averageRating,
      uniqueCountries
    };
  }, []);

  const countryData = {
    labels: Object.keys(analytics.countryCount),
    datasets: [{
      data: Object.values(analytics.countryCount),
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0',
        '#9966FF',
        '#FF9F40',
        '#4ECDC4',
        '#7C4DFF',
        '#FF7043',
        '#26A69A',
        '#AB47BC',
        '#FFA726',
      ],
      borderWidth: 1,
    }],
  };

  const ratingData = {
    labels: Object.keys(analytics.ratingCount).map(rating => `${rating} Stars`),
    datasets: [{
      label: 'Number of Reviews',
      data: Object.values(analytics.ratingCount),
      backgroundColor: 'rgba(241, 48, 36, 0.6)',
      borderColor: 'rgba(241, 48, 36, 1)',
      borderWidth: 1,
    }],
  };

  return (
    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Stats Overview */}
      <div className="col-span-full flex flex-wrap justify-center gap-8">
        <div className="bg-[rgba(65,47,123,0.15)] rounded-xl p-6 backdrop-blur-sm border border-white/10 text-center min-w-[200px] hover:border-accent/50 transition-colors duration-300">
          <div className="text-4xl font-bold text-accent mb-2">{analytics.totalReviews}</div>
          <div className="text-sm text-gray-300">Total Reviews</div>
        </div>
        <div className="bg-[rgba(65,47,123,0.15)] rounded-xl p-6 backdrop-blur-sm border border-white/10 text-center min-w-[200px] hover:border-accent/50 transition-colors duration-300">
          <div className="text-4xl font-bold text-accent mb-2">{analytics.averageRating}</div>
          <div className="text-sm text-gray-300">Average Rating</div>
        </div>
        <div className="bg-[rgba(65,47,123,0.15)] rounded-xl p-6 backdrop-blur-sm border border-white/10 text-center min-w-[200px] hover:border-accent/50 transition-colors duration-300">
          <div className="text-4xl font-bold text-accent mb-2">{analytics.uniqueCountries}</div>
          <div className="text-sm text-gray-300">Countries Served</div>
        </div>
      </div>

      {/* Country Distribution */}
      <div className="bg-[rgba(65,47,123,0.15)] rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-accent/50 transition-colors duration-300">
        <h3 className="text-xl font-semibold mb-4 text-center">Client Distribution by Country</h3>
        <div className="h-[300px] flex items-center justify-center">
          <Pie 
            data={countryData}
            options={{
              plugins: {
                legend: {
                  position: 'right',
                  labels: {
                    color: 'white',
                    font: {
                      size: 12
                    }
                  }
                },
                tooltip: {
                  callbacks: {
                    label: function(context) {
                      const label = context.label || '';
                      const value = context.raw || 0;
                      const percentage = ((value / analytics.totalReviews) * 100).toFixed(1);
                      return `${label}: ${value} (${percentage}%)`;
                    }
                  }
                }
              }
            }}
          />
        </div>
      </div>

      {/* Rating Distribution */}
      <div className="bg-[rgba(65,47,123,0.15)] rounded-xl p-6 backdrop-blur-sm border border-white/10 hover:border-accent/50 transition-colors duration-300">
        <h3 className="text-xl font-semibold mb-4 text-center">Rating Distribution</h3>
        <div className="h-[300px]">
          <Bar 
            data={ratingData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              scales: {
                y: {
                  beginAtZero: true,
                  ticks: {
                    color: 'white'
                  },
                  grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                  }
                },
                x: {
                  ticks: {
                    color: 'white'
                  },
                  grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                  }
                }
              },
              plugins: {
                legend: {
                  labels: {
                    color: 'white'
                  }
                },
                tooltip: {
                  callbacks: {
                    label: function(context) {
                      const value = context.raw || 0;
                      const percentage = ((value / analytics.totalReviews) * 100).toFixed(1);
                      return `${value} reviews (${percentage}%)`;
                    }
                  }
                }
              }
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ClientAnalytics;