install:
	npm install
	npm run docker
	npm run migration
	npm run seeds

start:
	npm run docker
	npm run dev
