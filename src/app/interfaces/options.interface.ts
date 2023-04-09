export interface OptionsInterface {
    sort : string,
    order : 'ASC' | 'DESC',
    searchValue : string,
    currentPage : number,
    totalPages : number,
    page : number,
    limit: number
    next: number ,
    prev: number
}