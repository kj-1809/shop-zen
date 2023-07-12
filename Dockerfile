FROM node:20-alpine3.17

WORKDIR /app

COPY package*.json .

RUN npm install

COPY . .  

EXPOSE 3000


ENV STRIPE_SECRET_KEY=sk_test_51NGPeRSIAlYtp24ZjktqEEi8QnZJ1bIzsHD1NdWVTUo5iVVHi9ZCF1vbl6A17BjwNt6h8LLUdt8xoOTUm7cZGCCZ00RhdbTmto \
BASE_URL=http://localhost:3000 \
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_dmVyaWZpZWQtbW9uaXRvci0zNC5jbGVyay5hY2NvdW50cy5kZXYk \
CLERK_SECRET_KEY=sk_test_f3hpavgYWnud747htza4JC0fdlRnZH4anatNr06VFk \
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in \
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/ \
DATABASE_URL=mysql://kzsuprqhwvi9yxwu6v6n:pscale_pw_b3wFE1oaX2WjJdBIirTA27QLB2DVFreI3yBpLGWjbCc@aws.connect.psdb.cloud/shopzen-db?sslaccept=strict 

CMD [ "npm" , "run" , "dev" ]