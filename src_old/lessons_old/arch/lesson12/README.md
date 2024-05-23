# ДЗ к лекции Архитектура#12

## Описать базовый интерфейс и реализацию для источника данных

```typescript
abstract class Provider implements DataProvider {

}

class User extends Provider {
 static request = Provider.request({contentType: 'json', responseType: 'json'});

 getURL =  '/get/user/:id';
 getMethod = 'GET';

 addURL = '/get/user';
 addMethod = 'PUT';
}

new User().get({id: 42}).then(console.log);
```

## Реализовать стандартную логику для компонента (любым способом)

Которая позволяла бы задать источник данных и компонент на старте запрашивал бы у него данные.

```js
const tpl = <my-component dataProvider={new User()} request={{id: 42}} />
```
