# Notice
There are two files missing in the backend: private key and public key. I removed them for the sake of security since Git keeped on asking me to remove it

For now, I'll just paste the command to generate both keys
## Private key
``` openssl genpkey -algorithm RSA -out private.key -aes256```

## Public key
``` openssl rsa -pubout -in private.key -out public.key ```

## Remark
Make sure the name of the key files match how they're mentioned in application.properties after "classpath:" 
