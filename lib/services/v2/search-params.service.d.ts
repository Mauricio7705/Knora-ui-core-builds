import { Observable } from 'rxjs';
/**
 * Represents teh parameters of an extended search.
 */
export declare class ExtendedSearchParams {
    generateGravsearch: (offset: number) => string;
    /**
     *
     * @param generateGravsearch a function the generates KnarQL.
     *                       The function is expected to take the offset
     *                       as a parameter and return a KnarQL query string.
     */
    constructor(generateGravsearch: (offset: number) => string);
}
export declare class SearchParamsService {
    private searchParamsMessage;
    currentSearchParams: Observable<ExtendedSearchParams>;
    constructor();
    /**
     * Update the parameters of an extended seacrh.
     *
     * @param {ExtendedSearchParams} searchParams
     */
    changeSearchParamsMsg(searchParams: ExtendedSearchParams): void;
}
