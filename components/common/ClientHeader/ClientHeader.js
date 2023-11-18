'use client'
import React, { useEffect, useRef, useState } from 'react'
import foodyLogo from '../../../assets/images/foodyClientLogo.svg'
import ukFlag from '../../../assets/icons/countryFlags/uk.svg';
import azeFlag from '../../../assets/icons/countryFlags/azeFlag.png';
import turkeyFlag from '../../../assets/icons/countryFlags/turkeyFlag.png'
import styles from '../ClientHeader/clientheader.module.css'
import Link from 'next/link'
import userIcon from '../../../assets/icons/user.svg'
import userBasket from '../../../assets/icons/userBasket.svg'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import LoadingBar from 'react-top-loading-bar';
import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

const ClientHeader = () => {
  const pathname = usePathname()
  const { t } = useTranslation('common')
  const router = useRouter()
  const ref = useRef(null)
  const currentQueryLocale = router.asPath
  const currentLocale = router.locale
  const [isShowLangContain, setIsShowLangContain] = useState(false)
  const [isCurrentLang, setIsCurrentLang] = useState('en')
  const [searchRest, setSearchRest] = useState(false)
  const [isInputActive, setIsInputActive] = useState(false)
  const [isSignUser, setIsSignUser] = useState()
  const [loading, setLoading] = useState(true);
  const [isOpenedUserModal, setIsOpenedUserModal] = useState(false)

  const {
    data: restData,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["restaurants"],
    queryFn: async () => {
      const { data } = await axios.get("/api/restuarants");
      return data;
    },
  });

  const { data: userBasketData } = useQuery({
    queryKey: ["basket"],
    queryFn: async () => {
      const { data } = await axios.get("/api/basket", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      return data;
    },
  });

  const { data: userData, isLoading: userDataLoading } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await axios.get("/api/auth/user", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      });
      return data;
    },
  });

  useEffect(() => {
    setIsSignUser(localStorage.getItem("access_token"));
    // dispatch(handleLangData(currentLocale))
    if (currentLocale) {
      setIsCurrentLang(currentLocale);
    } else if (currentQueryLocale) {
      setIsCurrentLang(currentQueryLocale);
    }
    setLoading(false);
  }, [currentLocale, currentQueryLocale]);

  const handlelangDropDown = () => {
    setIsShowLangContain(!isShowLangContain);
  };

  const handleChangeLang = (lang) => {
    localStorage.setItem("lang", lang);
    setIsShowLangContain(false);
    setIsCurrentLang(lang);
  };

  const handleSearchRes = (e) => {
    console.log(e.target.value);
    let newData = restData?.result.data.filter((rest) =>
      rest.name.toLowerCase().includes(e.target.value.toLowerCase())
    );
    setIsInputActive(e.target.value);
    setSearchRest(newData);
  };

  const openUserModal = () => {
    setIsOpenedUserModal(!isOpenedUserModal);
  };

  const handleLogout = () => {
    setIsOpenedUserModal(false)
    localStorage.removeItem('access_token')
    router.reload()
  }


  const className = `
  ${styles.searchArea} 
  absolute 
  top-24 
  bg-white 
  w-[450px] 
  h-[350px] 
  overflow-auto 
  z-50 
  rounded-xl 
  right-80 
  py-6
`;

  return (
    <>
      <header className='mt-4' style={{ "background": "#F3F4F6", "border-radius": "4px" }}>
        <div className={styles['header-container']}>
          <Link href='/'>
            <Image src={foodyLogo} alt='foody-logo' />
          </Link>
          <nav className={styles['nav-container']}>
            <li>
              <Link href='/' onClick={() => ref.current.complete()} className={pathname === '/' ? `${styles['link-bg']}` : `${styles['home-link']}`}>{t('Home')}</Link>
            </li>
            <li>
              <Link href='/restaurants' onClick={() => ref.current.complete()} className={pathname === '/restaurants' ? `${styles['link-bg']}` : `${styles['home-link']}`}>{t('Restaurants')}</Link>
            </li>
            <li>
              <Link href='/about-us' onClick={() => ref.current.complete()} className={pathname === '/about-us' ? `${styles['link-bg']}` : `${styles['home-link']}`}>{t('About us')}</Link>
            </li>
            <li>
              <Link href='/how-it-works' onClick={() => ref.current.complete()} className={pathname === '/how-it-works' ? `${styles['link-bg']}` : `${styles['home-link']}`}>{t('How it works')}</Link>
            </li>
            <li>
              <Link href='/faqs' onClick={() => ref.current.complete()} className={pathname === '/faqs' ? `${styles['link-bg']}` : `${styles['home-link']}`}>{t('FAQs')}</Link>
            </li>
          </nav>

          <div className={styles['header-right-container']}>
            <div className={styles['search-inp']}>
              {
                (!isSignUser && !loading) &&
                <>
                  <input type="text" className={styles['search']} onChange={(e) => handleSearchRes(e)} placeholder={t('Search')} />
                  {searchRest && isInputActive ?
                    <ul className={className}>
                      {searchRest?.map((rest) => (
                        <li onClick={() => router.push(`/restaurants/${rest?.id}`)} className='flex items-center mb-4 border-b border-gray-100 px-8 pb-4 cursor-pointer ease-linear duration-200 hover:opacity-50'>
                          <Image src={rest?.img_url} width={50} height={50} alt='restaurant-image' />
                          <div className='ml-8'>
                            <h3 className='font-semibold'>{rest?.name}</h3>
                            <p>{rest?.cuisine}</p>
                          </div>
                        </li>
                      ))}
                    </ul> : ''
                  }
                </>
              }

            </div>
            <div className='flex items-center'>
              <button onClick={() => handlelangDropDown()} className='w-10 mr-4' >
                <Image src={isCurrentLang === 'en' ? ukFlag : isCurrentLang === 'tr' ? turkeyFlag : isCurrentLang === 'az' ? azeFlag : ''} alt='uk-flag' />
              </button>
              {isShowLangContain &&
                <div className='absolute w-10 top-24 right-290 z-[9999]'>
                  {isCurrentLang === 'en' ? <>
                    <Link href='' locale='az' onClick={() => handleChangeLang('az')}>
                      <Image src={azeFlag} alt='aze-flag' className='mb-2' />
                    </Link>
                    <Link href='' locale='tr' onClick={() => handleChangeLang('tr')}>
                      <Image src={turkeyFlag} alt='turkey-flag' />
                    </Link>
                  </> : isCurrentLang === 'tr' ?
                    <>
                      <Link href='' locale='en' onClick={() => handleChangeLang('en')}>
                        <Image src={ukFlag} alt='uk-flag' className='mb-2' />
                      </Link>
                      <Link href='' locale='az' onClick={() => handleChangeLang('az')}>
                        <Image src={azeFlag} alt='aze-flag' />
                      </Link>
                    </>
                    : isCurrentLang === 'az' ? <>
                      <Link href='' locale='en' onClick={() => handleChangeLang('en')}>
                        <Image src={ukFlag} alt='uk-flag' className='mb-2' />
                      </Link>
                      <Link href='' locale='tr' onClick={() => handleChangeLang('tr')}>
                        <Image src={turkeyFlag} alt='turkey-flag' />
                      </Link>
                    </> : ''
                  }
                </div>
              }
            </div>
            {
              (!isSignUser && !loading) &&
              <>
                <div className={styles['signup-btn']}>
                  <Link href='/register' className='hover:opacity-80'>{t('Sign Up')}</Link>
                </div>
              </>
            }
            {
              userDataLoading && isSignUser ?
                <>
                  <Skeleton
                    circle
                    width={50}
                    style={{ "margin-right": "20px" }}
                    height={50}
                    containerClassName="avatar-skeleton"
                  />
                  <Skeleton width={140} height={30} />
                </> :
                (isSignUser && !loading) &&
                <>
                  <Link href='/user?page=basket' className='relative'><Image src={userBasket} className='rounded-full mr-4' />
                    <span className='absolute -top-2 text-red-500 font-semibold text-md right-1 bg-white rounded-xl px-2'>{userBasketData?.result.data.total_item}</span></Link>
                  <div onClick={() => openUserModal()} className='flex items-center'>
                    {
                      userData?.user.img_url && <Image className='rounded-full mr-3' width={50} height={50} src={userData?.user.img_url ? userData?.user.img_url : userIcon} />
                    }
                    <p className='font-bold cursor-pointer'>{userData?.user.fullname}</p>
                  </div>
                  {
                    isOpenedUserModal &&
                    <>
                      <div className='bg-white absolute top-24 right-[98px] z-50 h-[264px] shadow-lg rounded px-5 py-3 w-[178px]'>
                        <ul className='flex flex-col'>
                          <Link onClick={() => setIsOpenedUserModal(false)} className='font-thin mb-2 pl-2 px-20 pt-2 pb-2 hover:bg-[#D63626] hover:text-white cursor-pointer ease-in-out duration-500 rounded border-b border-gray-100' href="/user?page=profile">{t("Profile")}</Link>
                          <Link onClick={() => setIsOpenedUserModal(false)} className='font-thin mb-2  pl-2 px-22 pt-2 pb-2 hover:bg-[#D63626] hover:text-white cursor-pointer ease-in-out duration-500 rounded border-b border-gray-100' href="/user?page=basket">{t("Your Basket")}</Link>
                          <Link onClick={() => setIsOpenedUserModal(false)} className='font-thin mb-2  pl-2 px-22 pt-2 pb-2 hover:bg-[#D63626] hover:text-white cursor-pointer ease-in-out duration-500 rounded border-b border-gray-100' href="/user?page=user-orders">{t("Your Orders")}</Link>
                          <Link onClick={() => setIsOpenedUserModal(false)} className='font-thin mb-2  pl-2 px-20 pt-2 pb-2 hover:bg-[#D63626] hover:text-white cursor-pointer ease-in-out duration-500 rounded border-b border-gray-100' href="/user?page=user-checkout">{t("Checkout")}</Link>
                          <Link onClick={() => handleLogout()} className='font-thin mb-2  pl-2 px-20 pt-2 pb-2 hover:bg-[#D63626] hover:text-white cursor-pointer ease-in-out duration-500 rounded border-b border-gray-100' href="/">{t("Logout")}</Link>
                        </ul>
                      </div>
                    </>
                  }

                </>
            }
          </div>

        </div>
      </header>
      <LoadingBar color="#D63626" ref={ref} />

    </>
  )
}

export default ClientHeader

