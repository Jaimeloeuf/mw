================================================================================

+++++++++++++++++++++ THIS IS A GENERATED FILE ++++++++++++++++++++++++++++++++

+++++++++++++++++++++ DO NOT MODIFY OR FORMAT MANUALLY +++++++++++++++++++++

This file is automatically generated with the module:  
genServerConfigDoc

Generated hash in hex for the content after this section is:  
sha256(25ddf97203f22adb1e5c298785778081ccdf3b72e3ff38f5ad4e8e9485fd0ba3)

================================================================================
# Server Config

This documents all the available config values for [API server](../api/)

## Configs

| Config value                        | TS Type                                                          |
| ----------------------------------- | ---------------------------------------------------------------- |
| blog_recaptcha_secret               | (forceReload?: true) =\> string                                  |
| blog_email_address                  | (forceReload?: true) =\> string                                  |
| blog_email_reply                    | (forceReload?: true) =\> string                                  |
| muwno_gcp                           | (forceReload?: true) =\> boolean                                 |
| muwno_recaptcha_secret              | (forceReload?: true) =\> string                                  |
| muwno_postmark_api_key              | (forceReload?: true) =\> string                                  |
| muwno_email_transactional_address   | (forceReload?: true) =\> string                                  |
| muwno_email_transactional_reply     | (forceReload?: true) =\> string                                  |
| muwno_email_blast_address           | (forceReload?: true) =\> string                                  |
| muwno_email_blast_reply             | (forceReload?: true) =\> string                                  |
| muwno_openai_api_key                | (forceReload?: true) =\> string                                  |
| muwno_openai_org                    | (forceReload?: true) =\> string                                  |
| muwno_stripe_secret_key             | (forceReload?: true) =\> string                                  |
| muwno_stripe_webhook_secret         | (forceReload?: true) =\> string                                  |
| muwno_stripe_webhook_path           | (forceReload?: true) =\> string                                  |
| muwno_tele_bot_token                | (forceReload?: true) =\> string                                  |
| muwno_tele_admin_chat_id            | (forceReload?: true) =\> string                                  |
| muwno_openmeter_api_key             | (forceReload?: true) =\> string                                  |
| muwno_form_link                     | (forceReload?: true) =\> string                                  |
| muwno_throttle_ttl                  | (forceReload?: true) =\> number                                  |
| muwno_throttle_limit                | (forceReload?: true) =\> number                                  |
| whatch_tele_bot_token               | (forceReload?: true) =\> string                                  |
| http_disabled_paths                 | (forceReload?: true) =\> Set\<string\>                           |
| http_verbose_log_route_registration | (forceReload?: true) =\> boolean                                 |
| auth_github_oauth_client_id         | (forceReload?: true) =\> string                                  |
| auth_github_oauth_client_secret     | (forceReload?: true) =\> string                                  |
| auth_github_oauth_redirect_uri      | (forceReload?: true) =\> string                                  |
| df_verbose_log_calls                | (forceReload?: true) =\> boolean                                 |
| db_conn_string                      | (forceReload?: true) =\> string                                  |
| kysely_log_query                    | (forceReload?: true) =\> boolean                                 |
| kysely_log_error                    | (forceReload?: true) =\> boolean                                 |
| tele_webhook_secret_path            | (forceReload?: true) =\> string                                  |
| tele_adminbot_token                 | (forceReload?: true) =\> string                                  |
| tele_adminbot_admin_chat_id         | (forceReload?: true) =\> string                                  |
| env                                 | (forceReload?: true) =\> "production" \| "development" \| "test" |
| version                             | (forceReload?: true) =\> string                                  |
| port                                | (forceReload?: true) =\> number                                  |
| server_timeout                      | (forceReload?: true) =\> number                                  |
| base_url_to_self                    | (forceReload?: true) =\> string                                  |
| run_async_jobs_in_web_tier          | (forceReload?: true) =\> boolean                                 |
