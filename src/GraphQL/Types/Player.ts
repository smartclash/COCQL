import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
} from 'graphql';
import Clan from './Clan';
import * as axios from 'axios';
import Leauge from './Leauge';

const _req = axios.default.create({
    baseURL: 'https://api.clashofclans.com/v1/',
    headers: {
        'authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImQxNjJiZjM0LTRlOTMtNGEyOS1hZjEwLWI4YWY2OTA5MmIyNCIsImlhdCI6MTU1NzIxOTY3NSwic3ViIjoiZGV2ZWxvcGVyLzA1MjNlMTcwLTdkNjktMTdlMy02MmY4LTZlMDM3ZGFlOTVlOCIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjI3LjUuMTk2LjE0MCJdLCJ0eXBlIjoiY2xpZW50In1dfQ.JL2JQBXGu48ouDOUNvbq4W2AMWx1SLyZ3TeFDgKQP-JYifNpk4NTsKl9MhSLg0PkuLaqJ7h7VRxuG97N3a9unA'
    }
});

export default new GraphQLObjectType({
    name: 'Player',
    fields: () => ({
        tag: { type: GraphQLString },
        name: { type: GraphQLString },
        expLevel: { type: GraphQLInt },
        clanRank: { type: GraphQLInt },
        previousClanRank: { type: GraphQLInt },
        trophies: { type: GraphQLInt },
        versusTrophies: { type: GraphQLInt },
        attackWins: { type: GraphQLInt },
        defenseWins: { type: GraphQLInt },
        bestTrophies: { type: GraphQLInt },
        donations: { type: GraphQLInt },
        donationsReceived: { type: GraphQLInt },
        warStars: { type: GraphQLInt },
        role: { type: GraphQLString },
        townHallLevel: { type: GraphQLInt },
        builderHallLevel: { type: GraphQLInt },
        bestVersusTrophies: { type: GraphQLInt },
        versusBattleWins: { type: GraphQLInt },
        legendStatistics: {
            type: new GraphQLObjectType({
                name: 'LegendStats',
                fields: () => ({
                    legendTrophies: { type: GraphQLInt },
                    currentSeason: {
                        type: new GraphQLObjectType({
                            name: 'CurrentSeason',
                            fields: () => ({
                                rank: { type: GraphQLInt },
                                trophies: { type: GraphQLInt },
                                id: { type: GraphQLString },
                            })
                        })
                    },
                    previousSeason: {
                        type: new GraphQLObjectType({
                            name: 'PreviousSeason',
                            fields: () => ({
                                rank: { type: GraphQLInt },
                                trophies: { type: GraphQLInt },
                                id: { type: GraphQLString },
                            })
                        })
                    },
                    bestSeason: {
                        type: new GraphQLObjectType({
                            name: 'BestSeason',
                            fields: () => ({
                                rank: { type: GraphQLInt },
                                trophies: { type: GraphQLInt },
                                id: { type: GraphQLString },
                            })
                        })
                    }
                })
            })
        },
        achievements: {
            type: GraphQLList(new GraphQLObjectType({
                name: 'Achievements',
                fields: () => ({
                    name: { type: GraphQLString },
                    stars: { type: GraphQLInt },
                    value: { type: GraphQLInt },
                    target: { type: GraphQLInt },
                    info: { type: GraphQLString },
                    village: { type: GraphQLString },
                })
            }))
        },
        troops: {
            type: GraphQLList(new GraphQLObjectType({
                name: 'Troops',
                fields: () => ({
                    name: { type: GraphQLString },
                    level: { type: GraphQLInt },
                    maxLevel: { type: GraphQLInt },
                    village: { type: GraphQLString },
                })
            }))
        },
        heroes: {
            type: GraphQLList(new GraphQLObjectType({
                name: 'Heroes',
                fields: () => ({
                    name: { type: GraphQLString },
                    level: { type: GraphQLInt },
                    maxLevel: { type: GraphQLInt },
                    village: { type: GraphQLString },
                })
            }))
        },
        spells: {
            type: GraphQLList(new GraphQLObjectType({
                name: 'Spells',
                fields: () => ({
                    name: { type: GraphQLString },
                    level: { type: GraphQLInt },
                    maxLevel: { type: GraphQLInt },
                    village: { type: GraphQLString },
                })
            }))
        },
        clan: {
            type: Clan,
            async resolve(parent, args) {
                if (parent.clan) {
                    const { data } = await _req.get(`/clans/${encodeURIComponent(parent.clan.tag)}`);
                    return data;
                }

                return null;
            }
        },
        league: { type: Leauge },
    })
});
