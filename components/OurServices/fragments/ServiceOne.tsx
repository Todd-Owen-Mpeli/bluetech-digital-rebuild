// Imports
import { FC } from "react";
import Image from "next/image";
import {motion} from "framer-motion";
import {IOurServices} from "@/components/OurServices/types/index";

// Styling
import styles from "@/components/OurServices/styles/OurServices.module.scss";

// Components
import Paragraph from "@/components/Elements/Paragraph/Paragraph";

const ServiceOne: FC<IOurServices.IServiceOne> = ({serviceOne}) => {
    return (
        <div className={styles.serviceOne + " slide"}>
            <div className={styles.contentWrapper}>
                <div className={styles.content}>
                    <div className={styles.top}>
                        <h3 className={styles.title}>
                            {serviceOne?.title}
                        </h3>
                        <svg width="81" height="82" viewBox="0 0 81 82" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M52.9696 64.5854C51.6459 63.2617 49.6094 63.2617 48.2857 64.5854L42.7872 70.0839C41.4635 71.4076 39.4271 71.4076 38.1034 70.0839L32.4013 64.3818C31.0776 63.0581 31.0775 61.0216 32.4013 59.6979L80.971 11.1282L70.585 0.742188L22.0153 49.3119C20.6916 50.6356 18.6551 50.6356 17.3314 49.3119L11.6293 43.6098C10.3056 42.2861 10.3056 40.2497 11.6293 38.926L17.1277 33.4275C18.4515 32.1038 18.4515 30.0673 17.1277 28.7436L11.4256 23.0415C10.1019 21.7178 10.1019 19.6813 11.4256 18.3576L16.9241 12.8592C18.2478 11.5355 18.2478 9.499 16.9241 8.17529L11.222 2.47318C9.89828 1.14948 7.86182 1.14948 6.53812 2.47319L1.03965 7.97165C-0.284051 9.29535 -0.284051 11.3318 1.03965 12.6555L6.74177 18.3576C8.06547 19.6813 8.06546 21.7178 6.74176 23.0415L1.2433 28.54C-0.0804043 29.8637 -0.0804005 31.9001 1.2433 33.2238L6.94541 38.9259C8.26912 40.2497 8.26911 42.2861 6.94541 43.6098L1.44694 49.1083C0.123239 50.432 0.123243 52.4685 1.44694 53.7922L7.14905 59.4943C8.47276 60.818 8.47276 62.8545 7.14906 64.1782L1.6506 69.6766C0.326892 71.0003 0.32689 73.0368 1.6506 74.3605L7.3527 80.0626C8.67641 81.3863 10.7129 81.3863 12.0366 80.0626L17.535 74.5641C18.8587 73.2404 20.8952 73.2404 22.2189 74.5641L27.921 80.2662C29.2447 81.5899 31.2812 81.59 32.6049 80.2663L38.1034 74.7678C39.4271 73.4441 41.4635 73.4441 42.7872 74.7678L48.4893 80.4699C49.8131 81.7936 51.8495 81.7936 53.1732 80.4699L58.6717 74.9714C59.9954 73.6477 62.0319 73.6477 63.3556 74.9714L69.0577 80.6735C70.3814 81.9972 72.4178 81.9972 73.7415 80.6735L79.24 75.1751C80.5637 73.8514 80.5637 71.8149 79.24 70.4912L73.5379 64.7891C72.2142 63.4654 70.1777 63.4654 68.854 64.7891L63.3556 70.2876C62.0319 71.6113 59.9954 71.6113 58.6717 70.2876L52.9696 64.5854ZM22.2189 69.8803C20.8952 71.204 18.8587 71.204 17.535 69.8803L11.8329 64.1782C10.5092 62.8544 10.5092 60.818 11.8329 59.4943L17.3314 53.9958C18.6551 52.6721 20.6916 52.6721 22.0153 53.9958L27.7174 59.6979C29.0411 61.0216 29.0411 63.0581 27.7174 64.3818L22.2189 69.8803Z" fill="currentColor" />
                        </svg>
                    </div>
                    <div className={styles.bottom}>
                        <Paragraph
                            content={serviceOne?.paragraph}
                            className={serviceOne?.paragraph ? styles.paragraph : "hidden"}
                        />
                        <div>
                            <p className="num">(03)</p>
                            <Image
                                className={styles.image}
                                alt={serviceOne?.image?.altText}
                                src={serviceOne?.image?.sourceUrl}
                                width={serviceOne?.image?.mediaDetails?.width || 1000}
                                height={serviceOne?.image?.mediaDetails?.height || 1000}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ServiceOne;