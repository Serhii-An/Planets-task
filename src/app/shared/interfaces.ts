export interface IResponse {
    count: number,
    next?: string,
    previous?: string,
    results: Array<IPlanet>
}

export interface IPlanet {
    climate: string,
    created: string,
    diameter: string,
    edited: string,
    films: Array<string>,
    gravity: string,
    name: string,
    orbital_period: string,
    population: string,
    residents: Array<string>,
    rotation_period: string,
    surface_water: string,
    terrain: string,
    url: string
}

export interface IResident {
    birth_year: string,
    created: string,
    edited: string,
    eye_color: string,
    films: Array<string>,
    gender: string,
    hair_color: string,
    height: string,
    homeworld: string,
    mass: string,
    name: string,
    skin_color: string,
    species: Array<string | null>,
    starships: Array<string | null>,
    url: string,
    vehicles: Array<string | null>,
}