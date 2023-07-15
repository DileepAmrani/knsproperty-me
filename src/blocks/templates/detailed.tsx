interface Props {
    bed: number,
    bath: number,
    price: number,
    parking: number,
    images: string[],
    geopoint: string,
    description: string,
    short_address: string,
    area: number
    type: 'buy' | 'rent' | 'offplan',
}

import React from "react";
import Container from "@/blocks/atoms/container";
import Images from "@/blocks/atoms/image-preview";
import Formetter from "@/blocks/atoms/text-formatter";
import ContactCard from "@/blocks/molecules/cards/contact";
import addCommasToNumber from "@/app/lib/addCommasToNumbers";
import LocationCard from "@/blocks/molecules/cards/location";
import { LuBedDouble, LuBath, LuMaximize, LuParkingSquare } from "react-icons/lu";

const PropertyDetailedPage: React.FC<Props> = ({
    images, type, price, short_address, description, geopoint, bed, parking, bath, area
}) => {
    return (
        <Container>
            <div>
                <Images media={images} />
                <section className="grid lg:grid-cols-[3fr_1fr] gap-10 lg:px-0 px-5 ">
                    <main>
                        <h2 className="text-2xl font-semibold text-secondary"> AED {addCommasToNumber(price)} {type == 'rent' && <span className="text-sm uppercase text-primary " >/ per year</span>}</h2>

                        <div className="flex my-4 ">
                            <div className="_center pr-5">
                                <LuBedDouble className="mr-2 stroke-primary stroke-[2px]" />
                                <span className="font-light text-primary">{bed}</span>
                            </div>
                            <div className="_center border-l border-r border-[#00000010] px-5">
                                <LuBath className="mr-2 stroke-primary stroke-[2px] " />
                                <span className="font-light text-primary">{bath}</span>
                            </div>
                            <div className="_center border-l border-r border-[#00000010] px-5">
                                <LuParkingSquare className="mr-2 stroke-primary stroke-[2px] " />
                                <span className="font-light text-primary">{parking}</span>
                            </div>
                            <div className="_center px-5">
                                <LuMaximize className="mr-2 stroke-primary stroke-[2px]" />
                                <span className="font-light text-primary">{addCommasToNumber(area)} sq.ft</span>
                            </div>
                        </div>

                        <p className="font-light mb-5">{short_address}</p>
                        <hr className="opacity-10" />
                        <h2 className="text-xl font-semibold text-secondary mt-5 mb-2.5">Description</h2>
                        <Formetter text={description} />
                    </main>

                    <aside className="flex flex-col gap-5 mb-5 min-w-[320px] h-auto">
                        <ContactCard />
                        <LocationCard geopoint={geopoint} />
                    </aside>
                </section>
            </div>
        </Container>

    )
}

export default PropertyDetailedPage