export interface NavItemType {
    id: string;
    label: string;
    path: string;
    icon: string; // Material Symbol name
    badge?: {
        text: string | number;
        colorVariant?: 'default' | 'danger' | 'warning' | 'success';
    };
    children?: NavItemType[];
}

export interface NavGroupType {
    id: string;
    title: string;
    items: NavItemType[];
}
