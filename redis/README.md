ps:appName: [web1, ....]

ps:appName:web.1 = {
  id: 'uuid',
  app_name: 'sushi',
  state: 'crashed',
  process: ,
  command: '',
  rendezvous_url: '',
  type: 'Ps',
  release: ''
}

dyno:appName:web.1: [192.168.0.42:dyno-id, 192.168.0.43:dyno-id]

dyno:appName:web.1:192.168.0.42:dyno-id
  port
  state
  logplex_ids
  tranistioned_at

host: [192.168.0.42]

frontend:www.dotcloud.com : [appName http://192.168.0.42:80 http://192.168.0.43:80]
