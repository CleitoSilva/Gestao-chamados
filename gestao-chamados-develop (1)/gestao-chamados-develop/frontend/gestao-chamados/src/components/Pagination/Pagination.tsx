import { useState, useEffect, ReactElement } from "react";
import { MdFirstPage, MdNavigateBefore, MdNavigateNext, MdLastPage } from 'react-icons/md';

import './Pagination.css';

interface LinkModel {
  page: number;
  key: string;
  enable: boolean;
  text: ReactElement;
  active: boolean;
}

interface PaginationProps {
  currentPage: number;
  totalAmountOfPages: number;
  radio: number;
  tab?: string;
  onChange(page: number): void;
}

Pagination.defaultProps = {
  radio: 2
}

function Pagination({ currentPage, totalAmountOfPages, radio, onChange }: PaginationProps) {

    const [linkModels, setLinkModels] = useState<LinkModel[]>([]);

    function select(link: LinkModel) {
        if (link.page === currentPage) return ;
        if (!link.enable) return ;

        onChange(link.page);
    }

    function getLinkClass(link: LinkModel) {
        if (link.active) return `active`;
        if (!link.enable) return "disable";

        return "pointer";
    }

    useEffect(() => {
        const links: LinkModel[] = [];

        const enFirstPage = currentPage !== 0 && totalAmountOfPages > 0;
        const firstPage = 0;

        links.push({
            text: <MdFirstPage size={18} />,
            key: '<<',
            enable: enFirstPage,
            page: firstPage,
            active: false
        });

        const enPreviousPage = currentPage !== 0 && totalAmountOfPages > 0;
        const prevPage = currentPage - 1;

        links.push({
            text: <MdNavigateBefore size={18} />,
            key: '<',
            enable: enPreviousPage,
            page: prevPage,
            active: false
        });

        let starts = currentPage - radio > 0 ? currentPage - radio : 0;
        let finish = currentPage  + radio < totalAmountOfPages ? currentPage + radio : totalAmountOfPages;
        let leftToFinish = 0
        let leftToBegin = 0

        if(currentPage - radio <= 0){
            leftToFinish = Math.abs(currentPage - radio)
            if(finish + leftToFinish <= totalAmountOfPages){
            finish+= leftToFinish
            }
        }

        if(currentPage  + radio >= totalAmountOfPages){
            leftToBegin = Math.abs(totalAmountOfPages - (currentPage + radio))
            if(starts - leftToBegin >= 0){
                starts -= leftToBegin
            }
        }

        if (currentPage === 0) {
            finish = currentPage + (2 * radio) <= totalAmountOfPages ? currentPage + 2 * radio : totalAmountOfPages;
        } else if (currentPage === totalAmountOfPages) {
            starts = currentPage - 2 * radio >= 0 ? currentPage - 2 * radio : 0;
        }

        for (let i = starts; i <= finish; i++) {
            links.push({
                text: <span className="link-item-text">{i + 1}</span>,
                key: `${i}`,
                enable: true,
                page: i,
                active: currentPage === i
            });
        }

        const enNextPage = currentPage !== totalAmountOfPages   && totalAmountOfPages > 0;
        const nextPage = currentPage >= totalAmountOfPages ? totalAmountOfPages :   currentPage + 1;

        links.push({
            text: <MdNavigateNext size={18} />,
            key: '>',
            enable: enNextPage,
            page: nextPage,
            active: false
        });

        const enLastPage = currentPage !== totalAmountOfPages && totalAmountOfPages > 0;
        const lastPage = totalAmountOfPages ;

        links.push({
            text: <MdLastPage size={18} />,
            key: '>>',
            enable: enLastPage,
            page: lastPage,
            active: false
        });
        
        setLinkModels(links);
    }, [currentPage, radio, totalAmountOfPages]);

    return (
        <nav className="pagination">
            <ul className="pagination">
                {linkModels.map(link => 
                    <li key={link.key} onClick={() => select(link)} className={`link-item ${getLinkClass(link)}`}>
                        {link.text}
                    </li>
                )}
            </ul>
        </nav>
    );
}

export default Pagination;