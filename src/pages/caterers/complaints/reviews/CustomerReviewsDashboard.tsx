import React, { useState } from 'react';
import { useMockData } from '../../../../context/MockDataContext';
import { Card } from '../../../../components/Card';

interface CustomerReviewsDashboardProps {
    isDark: boolean;
}



export const CustomerReviewsDashboard: React.FC<CustomerReviewsDashboardProps> = ({ isDark }) => {
    const { customerReviews: mockReviews } = useMockData();
    const textColor = isDark ? 'text-gray-200' : 'text-slate-800';
    const subTextColor = isDark ? 'text-gray-400' : 'text-slate-500';
    const bgColor = isDark ? 'bg-[#0a0a0a]' : 'bg-white';
    const borderColor = isDark ? 'border-white/10' : 'border-slate-200';

    const [filterRating, setFilterRating] = useState<number | 'ALL'>('ALL');

    const filteredReviews = (mockReviews || []).filter((r: any) => filterRating === 'ALL' || r.rating === filterRating);

    return (
        <div className="flex flex-col gap-6 mt-4">
             {/* Stats Row */}
             <div className="grid grid-cols-3 gap-4">
                <Card className={`p-4 ${bgColor} ${borderColor} flex flex-col items-center justify-center`}>
                    <span className={`text-3xl font-bold ${textColor}`}>3.4</span>
                    <span className={`text-xs uppercase tracking-wider mt-1 ${subTextColor}`}>Average Rating</span>
                </Card>
                <Card className={`p-4 ${bgColor} ${borderColor} flex flex-col items-center justify-center`}>
                    <span className={`text-3xl font-bold ${textColor}`}>142</span>
                    <span className={`text-xs uppercase tracking-wider mt-1 ${subTextColor}`}>Total Reviews</span>
                </Card>
                <Card className={`p-4 ${bgColor} ${borderColor} flex flex-col items-center justify-center`}>
                    <span className={`text-3xl font-bold text-red-400`}>12%</span>
                    <span className={`text-xs uppercase tracking-wider mt-1 ${subTextColor}`}>Critical (1-2 Stars)</span>
                </Card>
             </div>

             {/* Reviews List */}
             <Card className={`flex flex-col ${bgColor} ${borderColor} overflow-hidden`}>
                <div className={`p-4 border-b ${borderColor} flex justify-between items-center bg-black/5`}>
                    <h3 className={`text-sm font-bold tracking-wider uppercase ${textColor}`}>Recent Reviews</h3>
                    <select
                        className={`text-sm p-1 rounded bg-transparent border ${borderColor} ${textColor} outline-none`}
                        value={filterRating}
                        onChange={(e) => setFilterRating(e.target.value === 'ALL' ? 'ALL' : Number(e.target.value))}
                    >
                        <option value="ALL" className="text-black">All Ratings</option>
                        <option value="5" className="text-black">5 Stars</option>
                        <option value="4" className="text-black">4 Stars</option>
                        <option value="3" className="text-black">3 Stars</option>
                        <option value="2" className="text-black">2 Stars</option>
                        <option value="1" className="text-black">1 Star</option>
                    </select>
                </div>

                <div className="flex flex-col divide-y divide-white/5">
                    {filteredReviews.length === 0 ? (
                        <div className={`p-8 text-center text-sm ${subTextColor}`}>No reviews found matching filter.</div>
                    ) : (
                        filteredReviews.map((review: any) => (
                            <div key={review.id} className="p-4 flex flex-col gap-2 hover:bg-white/5 transition-colors">
                                <div className="flex justify-between items-start">
                                    <div>
                                        <div className={`font-bold ${textColor}`}>{review.caterer}</div>
                                        <div className={`text-xs ${subTextColor}`}>by {review.author} on {review.date}</div>
                                    </div>
                                    <div className="flex">
                                        {[1, 2, 3, 4, 5].map(star => (
                                            <span key={star} className={`material-symbols-outlined text-[16px] ${star <= review.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'}`}>
                                                star
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <p className={`text-sm mt-2 ${textColor}`}>{review.comment}</p>
                            </div>
                        ))
                    )}
                </div>
             </Card>
        </div>
    );
};
