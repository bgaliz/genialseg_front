export type ClientType = {
    id?: string
    name: string,
    email: string,
    phone: string,
    address: {
        street: string,
        zipcode: string,
        number: string,
        neighborhood: string,
    },
}