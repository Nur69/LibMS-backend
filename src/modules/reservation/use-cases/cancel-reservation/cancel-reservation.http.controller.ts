import { routes } from '@config/app.routes';
import { cancelReservationSymbol } from '@modules/reservation/reservation.provider';
import { JwtAuthGuard } from '@modules/user/guards/jwt-auth.guard';
import { RolesDecorator } from '@modules/user/guards/roles.decorator';
import { RolesGuard } from '@modules/user/guards/roles.guard';
import {
  Controller,
  HttpStatus,
  Inject,
  Param,
  Patch,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { IdResponse } from 'src/interface-adapters/dtos/id.response.dto';
import { Id } from 'src/interface-adapters/interfaces/id.interface';
import { AuthenticateUserRequest } from 'src/interface-adapters/interfaces/user/authenticate-user.request.interface';
import { CancelReservationCommand } from './cancel-reservation.command';
import { CancelReservationService } from './cancel-reservation.service';

@Controller()
export class CancelReservationHttpController {
  constructor(
    @Inject(cancelReservationSymbol)
    readonly cancelReservationService: CancelReservationService,
  ) {}

  @Patch(routes.reservation.cancelReservation)
  @ApiOperation({ summary: 'Cancel a reservation' })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Reservation cancelled',
  })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @RolesDecorator('member', 'librarian')
  async cancel(
    @Request() req: AuthenticateUserRequest,
    @Param() param: Id,
  ): Promise<IdResponse> {
    const cancelReservationCommand = new CancelReservationCommand({
      user: req.user,
      reservationId: param.id,
    });

    const response = await this.cancelReservationService.cancelReservation(
      cancelReservationCommand,
    );
    return new IdResponse(response.value);
  }
}
