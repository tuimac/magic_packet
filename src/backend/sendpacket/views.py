from rest_framework import views, status
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from .host import Host
import logging
import traceback

logger = logging.getLogger("django")

class HostAPIViews(views.APIView):

    renderer_classes = [JSONRenderer]

    def get(self, request, *args, **kwargs):
        try:
            host = Host()
            response = host.query()
            return Response(response)
        except:
            logger.error(traceback.format_exc())
