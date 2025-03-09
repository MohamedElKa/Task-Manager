interface TaskTypes{
    id: string;
    title: string;
    content: string;
    time: string;
}

interface ColumnTypes{
    id: string;
    title: string;
    color: string;
    tasks: string[];
}

interface DataTypes{
    tasks: {
        [key: string]: TaskTypes;
    };
    columns: {
        [key: string]: ColumnTypes;
    };
}

interface InfoTypes{
    title: string;
    image: string;    
    value: number;
}

export type {TaskTypes, ColumnTypes, DataTypes, InfoTypes};