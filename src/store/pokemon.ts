import { defineStore } from "pinia"

interface PokemonType {
    id: number
    name: string
    spriteUrl: string

    stats: Array<{ name: string, value: number }>
    types: Array<string>
}

interface APIResponseType {
    count: number
    next: string
    previous: null | number | string
    results: Array<{ name: string, url: string }>
}

interface APIPokemonType {
    id: number
    species: { name: string, url: string }
    sprites: {
        other: { "official-artwork": { front_default: string } }
    }
    stats: Array<{
        base_stat: number
        stat: {
            name: string
        }
    }>
    types: Array<{ type: { name: string } }>
}

export const usePokemonStore = defineStore({
    id: "pokemon",

    state: () => ({
        offset: 0,
        limit: 10,
        current: 1,
        pokemons: Array<PokemonType>(),
        loadding: false,
    }),

    getters: {
        getCurrentPokemon(): PokemonType | undefined {
            return this.pokemons.find(pokemon => pokemon.id == this.current)
        }
    },

    actions: {
        async nextPokemon() {
            this.current++

            if ((this.current - 1) % this.limit == 0) {
                this.offset++
                await this.getPokemons()
            }
        },
        
        async backPokemon() {
            this.current = this.current - 1 < 1 ? 1 : this.current - 1

            if (this.current % this.limit == 0) {
                this.offset = this.offset - 1 < 0 ? 0 : this.offset - 1
                await this.getPokemons()
            }
        },

        async getPokemons() {
            try {
                this.pokemons = []
                this.loadding = true

                const response: APIResponseType = await (await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${this.limit}&offset=${this.offset * this.limit}`)).json()

                response.results.map(async pokemon => {
                    const allPokemonData: APIPokemonType = await (await fetch(pokemon.url)).json()

                    const stats = allPokemonData.stats.map(stat => ({ name: stat.stat.name, value: stat.base_stat }))
                    const types = allPokemonData.types.map(type => type.type.name)

                    this.pokemons.push({
                        id: allPokemonData.id,
                        name: allPokemonData.species.name,
                        spriteUrl: allPokemonData.sprites.other["official-artwork"].front_default,
                        stats,
                        types,
                    })
                })

                this.loadding = false
            }

            catch (e) {
                console.log(e)
            }
        }
    }
})
