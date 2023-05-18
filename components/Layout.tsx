import { ReactNode } from 'react';
import { SNSType } from '../types/globals.type';
import Footer from './Footer'
import Header from './Header'

type Props = {
	children: ReactNode
	SNSData: SNSType[]
};

const Layout = ({ children, SNSData }: Props) => {
    return (
        <>
            <Header></Header>
            {children}
            <Footer SNSData={SNSData} ></Footer>
        </>
    )
}

export default Layout