import {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    graphqlSync,
} from 'graphql';
import * as axios from 'axios';

const _req = axios.default.create({
    baseURL: 'https://api.clashofclans.com/v1/',
    headers: {
        'authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImQxNjJiZjM0LTRlOTMtNGEyOS1hZjEwLWI4YWY2OTA5MmIyNCIsImlhdCI6MTU1NzIxOTY3NSwic3ViIjoiZGV2ZWxvcGVyLzA1MjNlMTcwLTdkNjktMTdlMy02MmY4LTZlMDM3ZGFlOTVlOCIsInNjb3BlcyI6WyJjbGFzaCJdLCJsaW1pdHMiOlt7InRpZXIiOiJkZXZlbG9wZXIvc2lsdmVyIiwidHlwZSI6InRocm90dGxpbmcifSx7ImNpZHJzIjpbIjI3LjUuMTk2LjE0MCJdLCJ0eXBlIjoiY2xpZW50In1dfQ.JL2JQBXGu48ouDOUNvbq4W2AMWx1SLyZ3TeFDgKQP-JYifNpk4NTsKl9MhSLg0PkuLaqJ7h7VRxuG97N3a9unA'
    }
});

export default new GraphQLObjectType({
    name: 'League',
    fields: () => ({
        id: { type: GraphQLInt },
        name: { type: GraphQLString },
        iconUrls: {
            type: new GraphQLObjectType({
                name: 'LeaugeIcons',
                fields: {
                    small: { type: GraphQLString },
                    medium: { type: GraphQLString },
                    large: { type: GraphQLString },
                }
            })
        }
    })
});
