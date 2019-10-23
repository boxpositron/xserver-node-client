# X Server Node.js Client

[![Build Status](https://travis-ci.org/boxpositron/xserver-node-client.svg?branch=master)](https://travis-ci.org/boxpositron/xserver-node-client)


Node Client Wrapper for X Serial Server

<a name="XServerClient"></a>

## XServerClient
**Kind**: global class  

* [XServerClient](#XServerClient)
    * [new XServerClient(apiKey)](#new_XServerClient_new)
    * [.dumpKeys()](#XServerClient+dumpKeys)
    * [.queryKey(serialkey)](#XServerClient+queryKey)
    * [.extendKey(context)](#XServerClient+extendKey)
    * [.resetKey(context)](#XServerClient+resetKey)
    * [.listKeys(email)](#XServerClient+listKeys)
    * [.bindDiscord(context)](#XServerClient+bindDiscord)
    * [.unbindDiscord(context)](#XServerClient+unbindDiscord)
    * [.listTiers()](#XServerClient+listTiers)
    * [.createEternalKey(context)](#XServerClient+createEternalKey)
    * [.updateMeta(context)](#XServerClient+updateMeta)
    * [.banKey(context)](#XServerClient+banKey)
    * [.createKey(context)](#XServerClient+createKey)

<a name="new_XServerClient_new"></a>

### new XServerClient(apiKey)

| Param | Type | Description |
| --- | --- | --- |
| apiKey | <code>string</code> | Your generated xserver api key |

<a name="XServerClient+dumpKeys"></a>

### xServerClient.dumpKeys()
Return all generated license keys

**Kind**: instance method of [<code>XServerClient</code>](#XServerClient)  
<a name="XServerClient+queryKey"></a>

### xServerClient.queryKey(serialkey)
Query license key

**Kind**: instance method of [<code>XServerClient</code>](#XServerClient)  

| Param | Type | Description |
| --- | --- | --- |
| serialkey | <code>string</code> | License key |

<a name="XServerClient+extendKey"></a>

### xServerClient.extendKey(context)
Extend the days alloted to a license key

**Kind**: instance method of [<code>XServerClient</code>](#XServerClient)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Object</code> |  |
| context.serialkey | <code>string</code> | License key |
| context.days | <code>number</code> | Days to extend |

<a name="XServerClient+resetKey"></a>

### xServerClient.resetKey(context)
Reset the specified license key

**Kind**: instance method of [<code>XServerClient</code>](#XServerClient)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Object</code> |  |
| context.serialkey | <code>string</code> | License key |
| context.email | <code>string</code> | License email address |

<a name="XServerClient+listKeys"></a>

### xServerClient.listKeys(email)
List license keys attached to a specified email address

**Kind**: instance method of [<code>XServerClient</code>](#XServerClient)  

| Param | Type | Description |
| --- | --- | --- |
| email | <code>string</code> | Query email address |

<a name="XServerClient+bindDiscord"></a>

### xServerClient.bindDiscord(context)
Attached discord credentials to a license key

**Kind**: instance method of [<code>XServerClient</code>](#XServerClient)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Object</code> |  |
| context.email | <code>string</code> | License email |
| context.serialkey | <code>string</code> | License key |
| context.discord | <code>Object</code> |  |
| context.discord.id | <code>string</code> | Discord id |
| context.discord.username | <code>string</code> | Discord username |
| context.discord.discriminator | <code>string</code> | Discord discriminator |
| context.discord.avatar | <code>string</code> | Discord avatar |
| context.discord.isBot | <code>string</code> | Discord isBot flag |
| context.discord.nitro | <code>string</code> | Discord nitro flag |
| context.discord.email | <code>string</code> | Discord email |
| context.discord.emailVerified | <code>string</code> | Discord email verified flag |

<a name="XServerClient+unbindDiscord"></a>

### xServerClient.unbindDiscord(context)
Remove discord credentials from a license key

**Kind**: instance method of [<code>XServerClient</code>](#XServerClient)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Object</code> |  |
| context.serialkey | <code>string</code> | License key |

<a name="XServerClient+listTiers"></a>

### xServerClient.listTiers()
List available tiers

**Kind**: instance method of [<code>XServerClient</code>](#XServerClient)  
<a name="XServerClient+createEternalKey"></a>

### xServerClient.createEternalKey(context)
Create an eternal license key

**Kind**: instance method of [<code>XServerClient</code>](#XServerClient)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Object</code> |  |
| context.email | <code>string</code> | License email |
| context.tierHash | <code>string</code> | Plan tier hash |
| context.familyName | <code>string</code> | Owner family name |
| context.givenName | <code>string</code> | Owner given name |
| context.days | <code>number</code> | [0] - Active days |
| context.meta | <code>Array.&lt;Object&gt;</code> | Attached meta information |

<a name="XServerClient+updateMeta"></a>

### xServerClient.updateMeta(context)
Update attached meta information

**Kind**: instance method of [<code>XServerClient</code>](#XServerClient)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Object</code> |  |
| context.serialkey | <code>string</code> | License key |
| context.meta | <code>Array.&lt;Object&gt;</code> | Attached meta information |

<a name="XServerClient+banKey"></a>

### xServerClient.banKey(context)
Ban license key

**Kind**: instance method of [<code>XServerClient</code>](#XServerClient)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Object</code> |  |
| context.serialkey | <code>string</code> | License key |
| context.state | <code>boolean</code> | [true] - Ban state |

<a name="XServerClient+createKey"></a>

### xServerClient.createKey(context)
Create license key

**Kind**: instance method of [<code>XServerClient</code>](#XServerClient)  

| Param | Type | Description |
| --- | --- | --- |
| context | <code>Object</code> |  |
| context.email | <code>string</code> | License email |
| context.tierHash | <code>string</code> | Plan tier hash |
| context.familyName | <code>string</code> | Owner family name |
| context.givenName | <code>string</code> | Owner given name |
| context.days | <code>number</code> | [1] - Active duration |
| context.meta | <code>Array.&lt;Object&gt;</code> | Attached meta information |