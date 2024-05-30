export interface Data {
    id: number;
    name: string;
    poc: string;
    source: string;
    email: string;
    lastTalk: string;
    nextTalk: string;
    status: string;
}

export interface HeadCell {
    disablePadding: boolean;
    id: keyof Data;
    label: string;
    numeric: boolean;
}

export type Order = "asc" | "desc";

export type DataKey = keyof Data;


export interface EnhancedTableToolbarProps {
    numSelected: number;
    openFilterModal: () => void;
}

export interface EnhancedTableProps {
    numSelected: number;
    onRequestSort: (
        event: React.MouseEvent<unknown>,
        property: keyof Data
    ) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
    selectedColumnsIds: string[];
}
