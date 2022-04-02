export class Blog {
    id: number = 0;
    name: string = "";
    content: string = "";
    author: string = "";
    category: string = "";
    status: string = "";
}

export class BlogEditModel {
    id: number = 0;
    name: string = "";
    content: string = "";
    status: string = "";
    category_id: number = 0;
}

export class BlogCategoryModel {
    id: number = 0;
    name: string = "";
}