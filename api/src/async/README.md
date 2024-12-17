# api/src/async
`async` allow users to define and schedule asynchronous background jobs.


## What is the point of async jobs?
To run general compute without blocking the main caller/triggerer, e.g. we want to run some video processing, but we want to trigger this job from the web tier, without blocking web tier and spending web tier resources on running this.


## Note
With this, you can't just specify a function to run once the main caller is done executing like in [spp](../spp/README.md), you need to define a new `Async Job Type` before you can use it, and when you schedule a job, all the job details and arguments will be serialised and stored, before a machine that runs `Async Jobs` load it later on to run one by one.