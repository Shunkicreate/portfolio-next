import { GetServerSideProps } from 'next'
import { getURL } from 'next/dist/shared/lib/utils'
import { useEffect, useState } from 'react'
import { SiteType } from '../types/globals.type'
type Props = {
    site: SiteType
}

const SiteCard = (props: Props) => {
    const site = props.site

    return (
        <div className="container mx-auto px-20">
            <div className="flex bg-white border border-gray-300 rounded-xl overflow-hidden items-center justify-start">
                <div className="relative w-32 h-32 flex-shrink-0">
                    <div className="absolute left-0 top-0 w-full h-full flex items-center justify-center">
                        <img alt="Placeholder Photo" className="absolute left-0 top-0 w-full h-full object-cover object-center transition duration-50" loading="lazy" src={site.ogpImage} />
                    </div>
                </div>
                <div className="p-4">
                    <div>
                        url:{site.url}
                    </div>
                    <p className="text-sm line-clamp-1">New tweet title</p>
                    <p className="text-sm text-gray-500 mt-1 line-clamp-2">Description of what you are sharing</p>
                    <span className="flex items-center justify-start text-gray-500">
                        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                            <path fillRule="evenodd" d="M12.586 4.586a2 2 0 112.828 2.828l-3 3a2 2 0 01-2.828 0 1 1 0 00-1.414 1.414 4 4 0 005.656 0l3-3a4 4 0 00-5.656-5.656l-1.5 1.5a1 1 0 101.414 1.414l1.5-1.5zm-5 5a2 2 0 012.828 0 1 1 0 101.414-1.414 4 4 0 00-5.656 0l-3 3a4 4 0 105.656 5.656l1.5-1.5a1 1 0 10-1.414-1.414l-1.5 1.5a2 2 0 11-2.828-2.828l3-3z" clipRule="evenodd"></path>
                        </svg>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default SiteCard