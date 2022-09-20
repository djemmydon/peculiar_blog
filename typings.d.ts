export interface Posts {
    _id: string;
    _createdAt: string;
    title: string;
    author: {
        name: string;
        image: string
    },

    decription: string;
    mainImage: {
        asset:{
            url: string;
        };
    };
    slug: {
        current: string;
    },

    body:[]

}


export interface Ifram  {
    _id: string;
    name: string;
    email: string;
    comment: string;
}