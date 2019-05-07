import { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLInt } from 'graphql';
import { filter, find } from 'lodash';
import Player from './Types/Player';
import * as axios from 'axios';
import Clan from './Types/Clan';

const _req = axios.default.create({
    baseURL: 'https://api.clashofclans.com/v1/',
    headers: {
        'authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImQxNjJiZjM0LTRlOTMtNGEyOS1hZjEwLWI4YWY2OTA5MmIyNCIsImlhdCI6MTU1NzIxOTY3NSwic3ViIjoiZGV2ZWxvcGVyLzA1MjNlMTcwLTdkNjktMTdlMy02MmY4LTZlMDM3ZGFlOTVlOCIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjI3LjUuMTk2LjE0MCJdLCJ0eXBlIjoiY2xpZW50In1dfQ.JL2JQBXGu48ouDOUNvbq4W2AMWx1SLyZ3TeFDgKQP-JYifNpk4NTsKl9MhSLg0PkuLaqJ7h7VRxuG97N3a9unA'
    }
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: () => ({
        player: {
            type: Player,
            args: { 
                id: { type: GraphQLString }
            },
            async resolve(parent, args) {
                const { data } = await _req.get(`/players/${encodeURIComponent(args.id)}`);
                return data;
            }
        },
        clan: {
            type: Clan,
            args: {
                id: { type: GraphQLString }
            },
            async resolve(parent, args) {
                const { data } = await _req.get(`/clans/${encodeURIComponent(args.id)}`);
                return data;
            }
        }
    })
})

export default new GraphQLSchema({
    query: RootQuery
});
