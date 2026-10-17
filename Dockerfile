FROM node:24
WORKDIR /app
COPY . .
RUN corepack enable
RUN pnpm install --frozen-lockfile
RUN pnpm turbo run build --filter=@edforge/web
ENV NODE_ENV=production
EXPOSE 3000
CMD ["pnpm", "--filter", "@edforge/web", "start"]