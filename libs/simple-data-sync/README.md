# sds (simple-data-sync)
A simple library for frontend data synchronisation (a.k.a TanStack/Query lite).


## What problem does this solve?
1. Developer Experience (DX) over time.
    1. Solves by avoiding the need to manually sync with a local state management store/library like vuex/pinia/redux/zustand.
        1. Developers no longer have to manually keep the local store up to date whenever there is a state change.
        1. Since this is now done declaratively via configs like `cacheKey`, `staleAfterMilliseconds` and `runGarbageCollectionAfterMilliseconds`.
        1. This allows users to operate in a more declarative way of doing things, similar to what frameworks like React promotes, instead of a more imperative way where we have to manually wire up syncing and updates.


## Inspiration
1. <https://www.youtube.com/watch?v=9SrIirrnwk0>


## References
1. <https://tanstack.com/query/latest/docs/framework/react/quick-start>
1. <https://tanstack.com/query/latest/docs/framework/react/guides/important-defaults>
1. <https://tanstack.com/query/latest/docs/framework/react/guides/mutations>
1. <https://dev.to/vicnovais/understanding-referential-equality-in-reacts-useeffect-2m7o>
1. <https://react.dev/learn/synchronizing-with-effects#step-2-specify-the-effect-dependencies>
1. <https://tanstack.com/query/latest/docs/framework/react/guides/dependent-queries>
1. <https://tanstack.com/query/latest/docs/framework/react/comparison>
1. <https://swr.vercel.app/docs/getting-started>
1. <https://www.reddit.com/r/reactjs/comments/18f6egw/comment/kcs9wya/>
1. <https://github.com/dai-shi/react-suspense-fetch>
1. <https://react.dev/reference/react/useTransition>
1. <https://react.dev/learn/render-and-commit>