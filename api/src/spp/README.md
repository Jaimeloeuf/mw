# api/src/spp
spp (Simple Post Processing)

`SimplePostProcessing` allows service functions to define jobs (functions) to run asynchronously after things like responding to a client request, so as to not block the Request/Response flow on non business critical work, and also to ensure that if the non business critical work fails, it does not fail the overall service execution.

An example of this is when a user signs up for a new account, we want the user creation part to run as fast as possible so that the client experience is smooth. However we also want to send a welcome email in the same service function that handles the signup logic.

Instead of blocking the signup flow in the service function to await for the welcome email send to complete, this welcome email send can be wrapped in a job function and passed to `SimplePostProcessing` to run later in the background, so that the service function can complete quicker and let the controller reply to the client asap.

In the same scenario, we also dont want the a error thrown by the welcome email send to indicate that the entire signup flow failed, since the whole signup process may work flawlessly and the email service still throws. In this case, `SimplePostProcessing` will catch and record down the failure for you to handle separately.

However, since this is designed to run in the same execution context by deferring it to run after critical work like responding to client request, this does not work for use cases like "sending a email to new users 1 week later to check in on them", for that you would need [async](../async/).

Note that `SimplePostProcessing` can only be called once with "run" method in the entire service function, generally it should be defined at the end of the service function.
    - @todo enforce this with a eslint rule