FROM node:24-alpine

WORKDIR /app

# pnpm via corepack
RUN corepack enable && corepack prepare pnpm@10.28.2 --activate

# Copy only manifests first to maximize layer caching
COPY package.json pnpm-lock.yaml ./
# If you have a workspace:
# COPY pnpm-workspace.yaml ./
# If you rely on npmrc settings:
# COPY .npmrc ./

# Ensure non-interactive install inside Docker (no TTY)
ENV CI=true

RUN pnpm install --frozen-lockfile

# Now copy the rest of the source
COPY . .

EXPOSE 3000
CMD ["pnpm", "run", "dev"]
