|                                                                                      | Request | Response | [Execution Context](https://docs.nestjs.com/guards#execution-context) | [Arguments Host](https://docs.nestjs.com/exception-filters#arguments-host) | Exception | DI | Argument Value | Argument Metadata | [Call Handler](https://docs.nestjs.com/interceptors#call-handler) |
|--------------------------------------------------------------------------------------|---------|----------|-----------------------------------------------------------------------|----------------------------------------------------------------------------|-----------|----|----------------|-------------------|-------------------------------------------------------------------|
| [Controller](https://docs.nestjs.com/controllers)                                    | X       | X        |                                                                       |                                                                            |           | X  |                |                   | X                                                                 |
| [Provider](https://docs.nestjs.com/providers)                                        |         |          |                                                                       |                                                                            |           | X  |                |                   |                                                                   |
| [Module](https://docs.nestjs.com/modules)                                            |         |          |                                                                       |                                                                            |           | X  |                |                   |                                                                   |
| [Middleware](https://docs.nestjs.com/middleware)                                     | X       | X        |                                                                       |                                                                            |           | X  |                |                   | X                                                                 |
| [Filter](https://docs.nestjs.com/exception-filters)                                  | X       | X        |                                                                       | X                                                                          | X         | X  |                |                   |                                                                   |
| [Pipe](https://docs.nestjs.com/pipes)                                                |         |          |                                                                       |                                                                            |           | X  | X              | X                 |                                                                   |
| [Guard](https://docs.nestjs.com/guards)                                              | X       | X        | X                                                                     |                                                                            |           | X  |                |                   |                                                                   |
| [Interceptor](https://docs.nestjs.com/interceptors)                                  | X       | X        | X                                                                     |                                                                            |           | X  |                |                   | X                                                                 |
| [Custom Param Decorator](https://docs.nestjs.com/custom-decorators#param-decorators) | X       | X        | X                                                                     |                                                                            |           |    |                |                   |                                                                   |
| [Custom Decorator](https://docs.nestjs.com/custom-decorators#decorator-composition)  |         |          |                                                                       |                                                                            |           |    |                |                   |                                                                   |

**Controller** - Responsible for handling incoming requests and returning responses to the client.

**Provider** - Something that can inject dependencies.

**Module** - Provides metadata that Nest makes use of to organize the application structure.

**Middleware** - A function which is called before the route handler.

**Filter** - Responsible for processing all unhandled exceptions across an application.

**Pipe** - Transforms input data to the desired form, or validates input data.

**Guard** - Determines whether a given request will be handled by the route handler or not.

**Interceptor** - Binds extra logic before / after method execution; transforms the result returned from a function; transforms the exception thrown from a function; extends the basic function behavior; completely overrides a function depending on specific conditions.
