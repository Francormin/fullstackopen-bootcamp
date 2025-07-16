# Nombre del proyecto para cada entorno
DEV_PROJECT=todo-app-dev
PROD_PROJECT=todo-app-prod

# Archivos de Compose
DEV_COMPOSE=docker-compose.dev.yml
PROD_COMPOSE=docker-compose.yml

# ----------------------------------------
# Comandos para entorno de desarrollo
# ----------------------------------------

up-dev:
	docker-compose -f $(DEV_COMPOSE) --project-name $(DEV_PROJECT) up -d

down-dev:
	docker-compose -f $(DEV_COMPOSE) --project-name $(DEV_PROJECT) down

build-dev:
	docker-compose -f $(DEV_COMPOSE) --project-name $(DEV_PROJECT) build

# ----------------------------------------
# Comandos para entorno de producción
# ----------------------------------------

up-prod:
	docker-compose -f $(PROD_COMPOSE) --project-name $(PROD_PROJECT) up -d

down-prod:
	docker-compose -f $(PROD_COMPOSE) --project-name $(PROD_PROJECT) down

build-prod:
	docker-compose -f $(PROD_COMPOSE) --project-name $(PROD_PROJECT) build

# ----------------------------------------
# Limpiar volúmenes (opcional)
# ----------------------------------------

prune:
	docker volume prune
