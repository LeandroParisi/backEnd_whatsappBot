/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable import/extensions */
/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable no-shadow */
import 'reflect-metadata'
import { Application } from 'express'
import Container, { Service } from 'typedi'
import {
  BranchesRouter,
  CustomerRouter, LocationsRouter,
  MenusRouter,
  ProductsRouter,
  PromotionsRouter,
  UsersRouter,
} from './Domain/Services'
import OrdersRouter from './Domain/Services/Orders/OrdersRouter'
import CustomersAddressesRouter from './Domain/Services/CustomerAddresses/CustomerAddressesRouter'
import CouponsRouter from './Domain/Services/Coupons/CouponsRouter'
import ErrorCatcher from './Domain/Shared-v2-ts/Middlewares/ErrorHandler/ErrorCatcher'
import { PrismaClient } from '@prisma/client'

const express = require('express')
const cookieParser = require('cookie-parser')
const cors = require('cors')

require('dotenv').config()

const corsOptions = {
  credentials: true,
  origin: true,
}

@Service()
class Main {
  static PORT = process.env.PORT || 3000

  private app : Application

  /**
   *
   */
  constructor(
  ) {
    this.app = express()
  }

  public Setup() {
    this.app.use(cors(corsOptions))
    this.app.use(express.json())
    this.app.use(cookieParser())
  }

  public Start() {
    const prisma = new PrismaClient({
      log: ['query', 'info', 'warn', 'error'],
    })

    prisma.branches.findMany({
      include: {
        openingHours: true,
        city: {
          select: {
            cityName: true,
          },
        },
      },
      where: { branchName: undefined },
    }).then((s) => console.log({ s }))

    this.app.use(ErrorCatcher.HandleError)

    this.app.listen(Main.PORT, () => console.log(`listening to port ${Main.PORT}`))
  }
}

const Server = new Main()

Server.Setup()
Server.Start()
