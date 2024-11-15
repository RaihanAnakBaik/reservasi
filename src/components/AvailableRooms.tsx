import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

interface RoomImage {
    url: string;
    title: string;
}

const AvailableRooms: React.FC = () => {
    const sliderImages: RoomImage[] = [
        { url: '/mage.svg', title: 'Room 1' },
        { url: '/mage.svg', title: 'Room 2' },
        { url: '/mage.svg', title: 'Room 3' },
    ];

    return (
        <section className="available-rooms bg-white p-6 rounded-xl shadow-sm mb-8">
            <h2 className="text-2xl font-bold mb-6">Ruangan Tersedia</h2>
            <div className="room-carousel max-w-4xl mx-auto">
                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="mySwiper rounded-xl overflow-hidden"
                >
                    {sliderImages.map((image, index) => (
                        <SwiperSlide key={index}>
                            <div className="relative h-[400px] w-full">
                                <Image
                                    src={image.url}
                                    alt={image.title}
                                    fill
                                    className="object-cover"
                                    priority={index === 0}
                                />
                                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
                                    <h3 className="text-lg font-semibold">{image.title}</h3>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            </div>
        </section>
    );
};

export default AvailableRooms; 